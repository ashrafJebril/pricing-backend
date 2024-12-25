/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/User.entity';
import { Quote } from './quote/entities/Quote.entity';
import { Customer } from './customer/entities/customer.entity';
import { Report } from './report/entities/Report.entity';
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
      entities: [Customer, Quote, Users, Report], // Include all entities here
      synchronize: true, // Automatically sync database schema (use with caution in production)
    }),
  ],
})
export class DatabaseModule {}
