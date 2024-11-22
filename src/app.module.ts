import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerApi } from './customer/entities/customer.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      options: {
        encrypt: true,         
        enableArithAbort: true,    
        trustServerCertificate: false 
      },
      extra: {
        connectionTimeout: 30000, 
        requestTimeout: 30000      
      },
      entities: [CustomerApi],
      synchronize: false, // Se debe quitar en un paso a producción
      logging: ['error', 'query'],
    }),
  ],
})
export class AppModule {}
