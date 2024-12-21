/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  // Example: Create a new price entry
  create(priceData: Partial<Price>) {
    console.log('creaaaate', priceData);
    const price = this.priceRepository.create(priceData);
    return this.priceRepository.save(price);
  }

  // Example: Get all price entries with pagination
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.priceRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'ASC' }, // Adjust the ordering as needed
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Example: Find a price entry by ID
  findOne(id: number) {
    return this.priceRepository.findOneBy({ id });
  }
  async findByCatalogNumber(catalogNumber: string) {
    const price = await this.priceRepository.findOneBy({ catalogNumber });
    if (!price) {
      throw new Error(
        `Price with catalog numbers "${catalogNumber}" not found`,
      );
    }
    return price;
  }
}
