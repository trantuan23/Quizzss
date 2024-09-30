import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Classes } from '../classes/entities/class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Classes])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
