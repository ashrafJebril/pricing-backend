/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';
import { Price } from '../price/entities/price.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async processExcel(file: Express.Multer.File): Promise<string> {
    try {
      console.log('Processing Excel file...');

      // Parse the Excel file
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      console.log('Sheet name:', sheetName);

      // Convert sheet data to JSON
      const rawData: any[] = xlsx.utils.sheet_to_json(sheet);
      console.log('Parsed data:', rawData);

      // Map Excel headers to entity fields
      const mappedData: Partial<Price>[] = rawData.map((row) => ({
        catalogNumber: row['Catalog Number'],
        description: row['Description'],
        uom: row['UOM'],
        productGroup: row['Product Group'],
        quantityBreak: row['Quantity Break'],
        usListPrice2025: row['2025 US List Price      Effective 01/01/2025'],
      }));

      console.log('Mapped data:', mappedData);

      // Validate and insert each row into the database
      for (const row of mappedData) {
        if (
          !row.catalogNumber ||
          !row.description ||
          !row.uom ||
          !row.productGroup ||
          !row.quantityBreak ||
          !row.usListPrice2025
        ) {
          console.warn('Skipping incomplete row:', row);
          continue; // Skip rows with missing data
        }

        const newPrice = this.priceRepository.create(row);
        await this.priceRepository.save(newPrice);
      }

      return `Successfully uploaded ${mappedData.length} records to the Price table.`;
    } catch (error) {
      console.error('Error processing Excel file:', error);
      throw new Error('Failed to process the Excel file.');
    }
  }
}
