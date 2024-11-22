import { IsBoolean, IsDate, IsInt, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateCustomerDto {
    
    @IsInt()
    customerId: number; // Llave primaria

    @IsBoolean()
    nameStyle: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(8)
    title?: string;

    @IsString()
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    middleName?: string;

    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    suffix?: string;

    @IsOptional()
    @IsString()
    @MaxLength(128)
    companyName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(256)
    salesPerson?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    emailAddress?: string;

    @IsOptional()
    @IsString()
    @MaxLength(25)
    phone?: string;

    @IsString()
    @MaxLength(128)
    passwordHash: string;

    @IsString()
    @MaxLength(10)
    passwordSalt: string;

    @IsUUID()
    rowguid: string;

    @IsDate()
    modifiedDate: Date;


}
