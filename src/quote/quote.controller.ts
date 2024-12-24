
// quote.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote, QuoteStatus } from './entities/quote.entity';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async create(@Body() createQuoteDto: Partial<Quote>) {
    return await this.quoteService.create(createQuoteDto);
  }

  @Get()
  async findAll(@Query('status') status?: QuoteStatus, 
                @Query('creatorId') creatorId?: number,
                @Query('customerId') customerId?: number) {
    if (status) {
      return await this.quoteService.findByStatus(status);
    }
    if (creatorId) {
      return await this.quoteService.findByCreator(creatorId);
    }
    if (customerId) {
      return await this.quoteService.findByCustomer(customerId);
    }
    return await this.quoteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.quoteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateQuoteDto: Partial<Quote>) {
    return await this.quoteService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.quoteService.remove(id);
  }
}