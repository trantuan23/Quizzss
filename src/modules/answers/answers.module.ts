import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entities/answers.entities';
import { Users } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Answers,Users])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
