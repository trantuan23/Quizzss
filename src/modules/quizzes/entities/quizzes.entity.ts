// src/quizzes/quizzes.entity.ts
import { Questions } from '@/modules/questions/entities/question.entities';
import { Results } from '@/modules/results/entities/results.entity/results.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Quizzes {
  @PrimaryGeneratedColumn('uuid')
  quizz_id: string; 

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Users, (user) => user.quizzes, { onDelete: 'CASCADE' })
  created_by: Users;


  @OneToMany(() => Questions, (question) => question.quiz)
  questions: Questions[];

  @OneToMany(() => Results, (result) => result.quiz)
  results: Results[];
}
