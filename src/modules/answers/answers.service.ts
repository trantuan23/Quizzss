import { Injectable } from '@nestjs/common';
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

    ) { }

    async create(createAnswerDto: CreateAnswerDto): Promise<Answers> {
        const user = await this.usersRepository.findOne({ where: { user_id: createAnswerDto.userId } })
        const answer = await this.answersRepository.create({ ...createAnswerDto, user })
        return this.answersRepository.save(answer)


    }

    async findAll(): Promise<Answers[]> {
        return this.answersRepository.find({ relations: ['user'] })
    }

    async findOne(id: string): Promise<Answers> {
        return this.answersRepository.findOne({ where: { answer_id: id }, relations: ['user'] })
    }

    async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answers> {
        await this.answersRepository.update(id, updateAnswerDto)
        return this.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.answersRepository.delete(id)
        
    }
}
