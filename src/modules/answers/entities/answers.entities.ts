// src/answers/answers.entity.ts
import { Questions } from '@/modules/questions/entities/question.entities';
import { Users } from '@/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Answers {
    @PrimaryGeneratedColumn('uuid')
    answer_id: string;

    @Column({ type: 'text', nullable: true })
    answer_text: string;

    @Column({type:'boolean',nullable:true})
    is_conrrect : boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    submitted_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    // @ManyToOne(() => Users, (user) => user.answers, { onDelete: 'CASCADE' })
    // user: Users;
  
    @ManyToOne(() => Questions, (question) => question.answers, { onDelete: 'CASCADE' })
    question: Questions;


}
