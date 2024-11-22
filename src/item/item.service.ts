import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ItemService {

  private readonly logger = new Logger('ItemService');

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const item = this.itemRepository.create(createItemDto);
      await this.itemRepository.save(item);
      return item;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;

    return this.itemRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let item: Item;

    if (isUUID(term)) {
      item = await this.itemRepository.findOneBy({id: term});
    } else {
      const queryBuilder = this.itemRepository.createQueryBuilder();
      item = await queryBuilder
        .where('UPPER(name) =:name or username =:username', {
          name: term.toUpperCase(),
          username: term.toLowerCase()
        }).getOne();
    }

    if (!item)
      throw new NotFoundException(`Item with ${term} not found`);

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.preload({
      id: id,
      ...updateItemDto
    });

    if (!item)
      throw new NotFoundException(`Item with id: ${id} not found`);

    try {
      await this.itemRepository.save(item);
      return item;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
  }


  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
