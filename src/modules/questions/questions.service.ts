import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entities/question.entities';
import { Repository } from 'typeorm';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Questions)
        private questionReponsitory: Repository<Questions>,
        @InjectRepository(Quizzes)
        private quizzReponsitory: Repository<Quizzes>

    ) { }

    async create(createQuestionDto: CreateQuestionDto): Promise<Questions> {
        const quizz = await this.quizzReponsitory.findOne({ where: { quizz_id: createQuestionDto.quizzId } });
        const question = this.questionReponsitory.create({ ...createQuestionDto, quizz: quizz });
        return this.questionReponsitory.save(question);
    }

    async findAll(): Promise<Questions[]> {
        return this.questionReponsitory.find({ relations: ['quizz'] })
    }

    async findOne(id: string): Promise<Questions> {
        return this.questionReponsitory.findOne({ where: { question_id: id }, relations: ['quizz'] })
    }

    async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Questions> {
        await this.questionReponsitory.update(id, updateQuestionDto)
        return this.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.questionReponsitory.delete(id)
    }



}
