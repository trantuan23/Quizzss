import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DragDropAnswers } from './entities/dragdropanswer.entity/dragdropanswer.entity';
import { Repository } from 'typeorm';
import { Questions } from '../questions/entities/question.entities';
import { CreateDragDropAnswerDto } from './entities/dto/create.dto';
import { UpdateDragDropAnswerDto } from './entities/dto/update.dto';

@Injectable()
export class DragDropAnswersService {

    constructor(
        @InjectRepository(DragDropAnswers)
        private dragDropAnswerRepository: Repository<DragDropAnswers>,
        @InjectRepository(Questions)
        private questionRepository: Repository<Questions>
    ) { }

    async create(creatDrag: CreateDragDropAnswerDto): Promise<DragDropAnswers> {
        const question = await this.questionRepository.findOne({ where: { question_id: creatDrag.questionId } });

        if (!question) {
            throw new Error("Question not found"); // Kiểm tra nếu câu hỏi không tồn tại
        }

        const drag = this.dragDropAnswerRepository.create({
            ...creatDrag,
            question  // Sử dụng đúng tên quan hệ là 'question'
        });

        return this.dragDropAnswerRepository.save(drag);
    }


    async findAll(): Promise<DragDropAnswers[]> {
        return this.dragDropAnswerRepository.find({ relations: ['question'] })
    }

    async findOne(id: string): Promise<DragDropAnswers> {
        return this.dragDropAnswerRepository.findOne({ where: { dragDropAnswer_id: id }, relations: ['question'] })
    }

    async update(id: string, updateDrag: UpdateDragDropAnswerDto): Promise<DragDropAnswers> {
        await this.dragDropAnswerRepository.update(id, updateDrag)
        return this.findOne(id)

    }

    async remove(id: string): Promise<void> {
        this.dragDropAnswerRepository.delete(id)
    }
}
