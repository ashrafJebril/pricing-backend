import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/Report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  // Fetch the single report record
  async getReport(): Promise<Report[]> {
    return await this.reportRepository.find(); // The report view typically returns a single row
  }
}
