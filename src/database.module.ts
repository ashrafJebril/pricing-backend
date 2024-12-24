/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User.entity';
import { Quote } from './quote/entities/Quote.entity';
import { Customer } from './customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Make sure this is "postgres"
      host: 'localhost', // or the Docker container name, e.g., 'postgres-db'
      port: 5432, // Default PostgreSQL port
      username: 'pricing_user',
      password: 'password123',
      database: 'pricing_system',
      autoLoadEntities: true, // Automatically load entities
      entities: [Customer, Quote, User], // Include all entities here
      synchronize: true, // Automatically sync database schema (use with caution in production)
    }),
  ],
})
export class DatabaseModule {}
