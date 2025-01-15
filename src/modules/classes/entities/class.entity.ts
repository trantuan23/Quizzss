import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from '@/modules/users/entities/user.entity';
import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Results } from '@/modules/results/entities/results.entity/results.entity';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn('uuid')
  class_id: string;

  @Column({ length: 100 })
  class_name: string;

  @OneToMany(() => Classes, (cla) => cla.quizzes)
  quizzes: Quizzes[];

  @OneToMany(() => Classes, (cla) => cla.quizzes)
  results: Results[];

  @OneToMany(() => Users, (user) => user.class)
  user: Users[];
}

