import { IsArray, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateItemDto {

    @IsString()
    @MinLength(9)
    rut: string;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    username?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    age?: number;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    skills?: string[];


}
