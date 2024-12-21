/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Price } from '../price/entities/price.entity'; // Import the Price entity

@Module({
  imports: [TypeOrmModule.forFeature([Price])], // Include the Price entity
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
