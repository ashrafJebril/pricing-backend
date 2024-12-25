/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/User.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create a new user
  @Post()
  async createUser(@Body() userData: Partial<Users>): Promise<Partial<Users>> {
    return this.userService.createUser(userData);
  }

  // Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<Partial<Users>> {
    const { email, password } = loginData;
    return this.userService.login(email, password);
  }

  // Reset password
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(
    @Body() resetData: { email: string; newPassword: string },
  ): Promise<void> {
    const { email, newPassword } = resetData;
    return this.userService.resetPassword(email, newPassword);
  }

  // Get all users
  @Get()
  async findAllUsers(): Promise<Partial<Users>[]> {
    return this.userService.findAllUsers();
  }

  // Get a user by ID
  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<Partial<Users> | null> {
    return this.userService.findUserById(id);
  }

  // Update a user
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<Users>,
  ): Promise<Partial<Users>> {
    return this.userService.updateUser(id, updateData);
  }

  // Soft delete a user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDeleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.softDeleteUser(id);
  }

  // Hard delete a user
  @Delete(':id/hard')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  // Restore a soft-deleted user
  @Patch(':id/restore')
  async restoreUser(@Param('id') id: number): Promise<Partial<Users>> {
    return this.userService.restoreUser(id);
  }
}
