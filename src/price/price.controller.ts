/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './entities/price.entity';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  create(@Body() createPriceDto: Partial<Price>) {
    return this.priceService.create(createPriceDto);
  }

  @Get()
  async getAllPrices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.priceService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.priceService.findOne(id);
  }
  @Get('search/:catalogNumber')
  async searchByCatalogNumber(@Param('catalogNumber') catalogNumber: string) {
    console.log('ashrafff');
    try {
      return await this.priceService.findByCatalogNumber(catalogNumber);
    } catch (error) {
      console.log('error', error);
    }
  }
}
