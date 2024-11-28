import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './entities/answers.entities';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answers)
        private answersRepository: Repository<Answers>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    async create(createAnswerDto: CreateAnswerDto): Promise<{ message: string; data: Answers }> {
        const user = await this.usersRepository.findOne({ where: { user_id: createAnswerDto.userId } });
        if (!user) {
            throw new BadRequestException('User not found!');
        }
        const answer = this.answersRepository.create({ ...createAnswerDto, user });
        const savedAnswer = await this.answersRepository.save(answer);
        return {
            message: 'Tạo câu trả lời thành công!',
            data: savedAnswer,
        };
    }

    async findAll(): Promise<{ message: string; data: Answers[] }> {
        const answers = await this.answersRepository.find({ relations: ['user'] });
        return {
            message: 'Lấy danh sách câu trả lời thành công!',
            data: answers,
        };
    }

    async findOne(id: string): Promise<{ message: string; data: Answers }> {
        const answer = await this.answersRepository.findOne({ where: { answer_id: id }, relations: ['user'] });
        if (!answer) {
            throw new BadRequestException('Answer not found!');
        }
        return {
            message: 'Lấy thông tin câu trả lời thành công!',
            data: answer,
        };
    }

    async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<{ message: string; data: Answers }> {
        await this.answersRepository.update(id, updateAnswerDto);
        const updatedAnswer = await this.findOne(id);
        return {
            message: 'Cập nhật câu trả lời thành công!',
            data: updatedAnswer.data,
        };
    }

    async remove(id: string): Promise<{ message: string }> {
        await this.findOne(id); // Kiểm tra nếu Answer tồn tại
        await this.answersRepository.delete(id);
        return {
            message: 'Xoá câu trả lời thành công!',
        };
    }
}
