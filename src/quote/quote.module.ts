import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/Quote.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Quote])],
  providers: [QuoteService],
  controllers: [QuoteController]
})
export class QuoteModule {}
