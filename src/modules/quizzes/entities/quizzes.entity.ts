import { Answers } from '@/modules/answers/entities/answers.entities';
import { Classes } from '@/modules/classes/entities/class.entity';
import { Questions } from '@/modules/questions/entities/question.entities';
import { Results } from '@/modules/results/entities/results.entity/results.entity';
import { Subjects } from '@/modules/subjects/entities/subject.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Quizzes {
  @PrimaryGeneratedColumn('uuid')
  quizz_id: string; 

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @Column()
  time : number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;


  @ManyToOne(() => Users, (user) => user.quizzes, { eager: false })
  user: Users;

  @ManyToOne(() => Classes, (cla) => cla.quizzes, { eager: false })
  class: Classes;

  @ManyToOne(() => Subjects, (sub) => sub.quizzes, { eager: false })
  subject: Subjects;

  @ManyToOne(() => Results, (result) => result.quizzes, { eager: false })
  results: Results;


  @OneToMany(() => Questions, (question) => question.quizz)
  questions: Questions[];

  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];



}
