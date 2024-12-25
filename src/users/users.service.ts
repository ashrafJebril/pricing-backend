/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/User.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // Create a new user with encrypted password
  async createUser(userData: Partial<Users>): Promise<Omit<Users, 'password'>> {
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const newUser = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(newUser);
    const { password, ...result } = savedUser;
    return result;
  }

  // Login function
  async login(
    email: string,
    password: string,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || user.isDeleted) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // Reset password function
  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await this.userRepository.save(user);
  }

  // Find all users
  async findAllUsers(): Promise<Omit<Users, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => user);
  }

  // Find a user by ID
  async findUserById(id: number): Promise<Omit<Users, 'password'> | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<Users | null> {
    return this.userRepository.findOneBy({ email });
  }

  // Update a user's information
  async updateUser(
    id: number,
    updateData: Partial<Users>,
  ): Promise<Omit<Users, 'password'>> {
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.findUserById(id);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // Soft delete a user
  async softDeleteUser(id: number): Promise<void> {
    await this.userRepository.update(id, { isDeleted: true });
  }

  // Hard delete a user
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Restore a soft-deleted user
  async restoreUser(id: number): Promise<Omit<Users, 'password'>> {
    await this.userRepository.update(id, { isDeleted: false });
    const restoredUser = await this.findUserById(id);
    return restoredUser;
  }
}
