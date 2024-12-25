import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/User.entity';
import { UsersController } from './users.controller';
@Module({
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([Users])],
  controllers:[UsersController]
})
export class UsersModule {}
