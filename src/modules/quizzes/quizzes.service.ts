// src/modules/quizzes/quizzes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizDto } from './dto/update-quizz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private quizzesRepository: Repository<Quizzes>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createQuizDto: CreateQuizzDto): Promise<Quizzes> {
    const user = await this.usersRepository.findOne({ where: { user_id: createQuizDto.userId } });
    const quiz = this.quizzesRepository.create({ ...createQuizDto, user });
    return this.quizzesRepository.save(quiz);
  }

  async findAll(): Promise<Quizzes[]> {
    return this.quizzesRepository.find({ relations: ['user', 'questions', 'results'] });
  }

  async findOne(id: string): Promise<Quizzes> {
    return this.quizzesRepository.findOne({ where: { quizz_id: id }, relations: ['user', 'questions', 'results'] });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    await this.quizzesRepository.update(id, updateQuizDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.quizzesRepository.delete(id);
  }
}
