/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Create a new customer
  async create(customerData: Partial<Customer>): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(customerData);
      return await this.customerRepository.save(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  // Get all customers with pagination
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Customer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.customerRepository.findAndCount({
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

  // Find a single customer by ID
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // Update a customer by ID
  async update(id: number, updateData: Partial<Customer>): Promise<Customer> {
    const customer = await this.findOne(id); // Reuse the `findOne` method to check if the customer exists
    Object.assign(customer, updateData);
    return await this.customerRepository.save(customer);
  }

  // Delete a customer by ID
  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id); // Reuse the `findOne` method to check if the customer exists
    await this.customerRepository.remove(customer);
  }
}
