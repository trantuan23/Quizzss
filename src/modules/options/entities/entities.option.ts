import { Questions } from '@/modules/questions/entities/question.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Options {
    @PrimaryGeneratedColumn('uuid')
    option_id: string;

    @Column({ length: 255 })
    option_text: string;

    @Column()
    is_correct: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Questions, (question) => question.options, { onDelete: 'CASCADE' })
    question: Questions;
}
