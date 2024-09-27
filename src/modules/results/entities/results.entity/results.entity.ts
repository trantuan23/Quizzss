// src/results/results.entity.ts
import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Results {
    @PrimaryGeneratedColumn('uuid')
    result_id: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    score: number;

    @CreateDateColumn()
    completed_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.results, { onDelete: 'CASCADE' })
    user: Users;

    @ManyToOne(() => Quizzes, (quizz) => quizz.results, { onDelete: 'CASCADE' })
    quizz: Quizzes;



}
