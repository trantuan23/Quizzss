import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn('uuid')
  subject_id: string;

  @Column({ length: 100 })
  subject_name: string;
}
