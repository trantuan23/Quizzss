import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Users } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quizzes,Users])],
  providers: [QuizzesService],
  controllers: [QuizzesController]
})
export class QuizzesModule {}
