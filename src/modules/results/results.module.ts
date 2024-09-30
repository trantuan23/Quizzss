import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { Users } from '../users/entities/user.entity';
import { Results } from './entities/results.entity/results.entity';
import { Subjects } from '../subjects/entities/subject.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quizzes,Users,Results,Subjects])],
  providers: [ResultsService],
  controllers: [ResultsController]
})
export class ResultsModule {}
