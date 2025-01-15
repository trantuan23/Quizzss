import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entities/user.entity';
import { Answers } from './modules/answers/entities/answers.entities';
import { AudioGuesses } from './modules/audioguesses/entities/audioguesses.entity';
import { DragDropAnswers } from './modules/dragdropanswers/entities/dragdropanswer.entity/dragdropanswer.entity';
import { Questions } from './modules/questions/entities/question.entities';
import { Quizzes } from './modules/quizzes/entities/quizzes.entity';
import { Results } from './modules/results/entities/results.entity/results.entity';
import { UsersModule } from './modules/users/users.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { AnswersModule } from './modules/answers/answers.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResultsModule } from './modules/results/results.module';
import { AudioGuessesModule } from './modules/audioguesses/audioguesses.module';
import { DragDropAnswersModule } from './modules/dragdropanswers/dragdropanswers.module';
import { ClassesModule } from './modules/classes/classes.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { Classes } from './modules/classes/entities/class.entity';
import { Subjects } from './modules/subjects/entities/subject.entity';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Đảm bảo bạn đang sử dụng đúng loại cơ sở dữ liệu
      host: process.env.PG_HOST || 'localhost', // Kiểm tra `host`
      port: parseInt(process.env.PG_PORT, 10) || 5432, // Kiểm tra `port`, PostgreSQL mặc định là 5432
      username: process.env.PG_USER || 'your_username', // Kiểm tra tên người dùng
      password: process.env.PG_PASSWORD || 'your_password', // Kiểm tra mật khẩu
      database: process.env.PG_DB || 'your_database_name', // Kiểm tra tên cơ sở dữ liệu
      entities: [Users, Answers, AudioGuesses, DragDropAnswers, Questions, Quizzes, Results, Classes, Subjects],
      synchronize: true,
    }),
    
    UsersModule,
    QuizzesModule,
    AnswersModule,
    QuestionsModule,
    ResultsModule,
    AudioGuessesModule,
    DragDropAnswersModule,
    ClassesModule,
    SubjectsModule,
    ClassesModule,
    SubjectsModule
  ],
})
export class AppModule { }
