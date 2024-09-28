import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entities/user.entity';
import { Answers } from './modules/answers/entities/answers.entities';
import { AudioGuesses } from './modules/audioguesses/entities/audioguesses.entity';
import { DragDropAnswers } from './modules/dragdropanswers/entities/dragdropanswer.entity/dragdropanswer.entity';
import { Options } from './modules/options/entities/entities.option';
import { Questions } from './modules/questions/entities/question.entities';
import { Quizzes } from './modules/quizzes/entities/quizzes.entity';
import { Results } from './modules/results/entities/results.entity/results.entity';
import { UsersModule } from './modules/users/users.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { AnswersModule } from './modules/answers/answers.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResultsModule } from './modules/results/results.module';
import { OptionsModule } from './modules/options/options.module';
import { AudioGuessesModule } from './modules/audioguesses/audioguesses.module';
import { DragDropAnswersModule } from './modules/dragdropanswers/dragdropanswers.module';
import { ClassesService } from './modules/classes/classes.service';
import { ClassesController } from './modules/classes/classes.controller';
import { ClassesModule } from './modules/classes/classes.module';
import { SubjectsModule } from './modules/subjects/subjects.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Users, Answers, AudioGuesses, DragDropAnswers, Options, Questions, Quizzes, Results],
      synchronize: true,
    }),
    UsersModule,
    QuizzesModule,
    AnswersModule,
    QuestionsModule,
    ResultsModule,
    OptionsModule,
    AudioGuessesModule,
    DragDropAnswersModule,
    ClassesModule,
    SubjectsModule,
  ],
  controllers: [AppController, ClassesController],
  providers: [AppService, ClassesService],
})
export class AppModule { }
