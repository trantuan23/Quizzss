import { Answers } from "@/modules/answers/entities/answers.entities";
import { Quizzes } from "@/modules/quizzes/entities/quizzes.entity";
import { Results } from "@/modules/results/entities/results.entity/results.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}
@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role: UserRole;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;


    @OneToMany(() => Quizzes, (quiz) => quiz.user)
    quizzes: Quizzes[];
  
    @OneToMany(() => Answers, (answer) => answer.student)
    answers: Answers[];
  
    @OneToMany(() => Results, (result) => result.student)
    results: Results[];


}
