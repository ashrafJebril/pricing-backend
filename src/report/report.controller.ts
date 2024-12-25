import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './entities/Report.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReport(): Promise<Report[]> {
    return await this.reportService.getReport();
  }
}
