// src/questions/questions.entity.ts
import { Answers } from '@/modules/answers/entities/answers.entities';
import { AudioGuesses } from '@/modules/audioguesses/entities/audioguesses.entity/audioguesses.entity';
import { DragDropAnswers } from '@/modules/dragdropanswers/entities/dragdropanswer.entity/dragdropanswer.entity';
import { Options } from '@/modules/options/entities/entities.option';
import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  DRAG_DROP = 'drag_drop',
  AUDIO_GUESS = 'audio_guess',
}

@Entity()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  question_id: string;

  @ManyToOne(() => Quizzes, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quizzes;


  @Column({ type: 'text' })
  question_text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  question_type: QuestionType;

  @Column({ length: 255, nullable: true })
  media_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Options, (option) => option.question)
  options: Options[];

  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];

  @OneToMany(() => DragDropAnswers, (dda) => dda.question)
  drag_drop_answers: DragDropAnswers[];

  @OneToMany(() => AudioGuesses, (ag) => ag.question)
  audio_guesses: AudioGuesses[];



}
