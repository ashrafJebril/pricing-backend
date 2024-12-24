// quote.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote, QuoteStatus } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  // Creates the base query with selected fields for both creator and customer
  private getBaseQuery() {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.creator', 'creator')
      .leftJoinAndSelect('quote.customer', 'customer')
      .select([
        'quote.id',
        'quote.creatorId',
        'quote.customerId',
        'quote.quote',
        'quote.status',
        // Selected creator fields
        'creator.id',
        'creator.fullName',
        'creator.email',
        // Selected customer fields
        'customer.id',
        'customer.companyName',
        'customer.email',
        'customer.phoneNumber'
      ]);
  }

  async create(data: Partial<Quote>): Promise<Quote> {
    const newQuote = this.quoteRepository.create(data);
    await this.quoteRepository.save(newQuote);
    
    // Fetch the created quote with selected relations
    return this.findOne(newQuote.id);
  }

  async findAll(): Promise<Quote[]> {
    return this.getBaseQuery().getMany();
  }

  async findOne(id: number): Promise<Quote> {
    const quote = await this.getBaseQuery()
      .where('quote.id = :id', { id })
      .getOne();

    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }

    return quote;
  }

  async update(id: number, data: Partial<Quote>): Promise<Quote> {
    await this.quoteRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.quoteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Quote #${id} not found`);
    }
  }

  async findByStatus(status: QuoteStatus): Promise<Quote[]> {
    return this.getBaseQuery()
      .where('quote.status = :status', { status })
      .getMany();
  }

  async findByCreator(creatorId: number): Promise<Quote[]> {
    return this.getBaseQuery()
      .where('quote.creatorId = :creatorId', { creatorId })
      .getMany();
  }

  async findByCustomer(customerId: number): Promise<Quote[]> {
    return this.getBaseQuery()
      .where('quote.customerId = :customerId', { customerId })
      .getMany();
  }
}
