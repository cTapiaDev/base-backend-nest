import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerApi } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class CustomerService {

  private readonly logger = new Logger('CustomerService');

  constructor(
    @InjectRepository(CustomerApi)
    private readonly customerRepository: Repository<CustomerApi>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.customerRepository.find({})
  }

  async findOne(term: number) {
    let customer: CustomerApi;

    if (isUUID(term)) {
      customer = await this.customerRepository.findOneBy({customerId: term});
    } else {
      const queryBuilder = this.customerRepository.createQueryBuilder();
      customer = await queryBuilder
        .where('UPPER(name) =:name or username =:username', {
          name: term,
          username: term
        }).getOne();
    }

    if (!customer)
      throw new NotFoundException(`Customer with ${term} not found`);

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      customerId: id,
      ...updateCustomerDto
    });

    if (!customer)
      throw new NotFoundException(`Customer with id: ${id} not found`);

    try {
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }


  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
