import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { Users } from '../users/entities/user.entity';
import { Results } from './entities/results.entity/results.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quizzes,Users,Results])],
  providers: [ResultsService],
  controllers: [ResultsController]
})
export class ResultsModule {}
