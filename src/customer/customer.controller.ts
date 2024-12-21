import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Create a new customer
  @Post()
  async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  // Get all customers with pagination
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{
    data: Customer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.customerService.findAll(page, limit);
  }

  // Get a single customer by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  // Update a customer by ID
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, updateData);
  }

  // Delete a customer by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.customerService.remove(id);
  }
}
