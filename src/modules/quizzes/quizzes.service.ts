import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
        private readonly quizzesRepository: Repository<Quizzes>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async create(createQuizDto: CreateQuizzDto): Promise<Quizzes> {
        try {
            // Kiểm tra xem user có tồn tại hay không
            const user = await this.usersRepository.findOne({ where: { user_id: createQuizDto.userId } });
            if (!user) {
                throw new BadRequestException({
                    message: `User với ID ${createQuizDto.userId} không tồn tại.`,
                    code: 'USER_NOT_FOUND'
                });
            }

            const quiz = this.quizzesRepository.create({ ...createQuizDto, user });
            return this.quizzesRepository.save(quiz);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException({
                message: 'Có lỗi xảy ra trong quá trình tạo quiz.',
                code: 'CREATE_QUIZ_FAILED'
            });
        }
    }

    async findAll(): Promise<Quizzes[]> {
        const quizzes = await this.quizzesRepository.find({ relations: ['user', 'questions', 'results'] });
        if (!quizzes.length) {
            throw new NotFoundException({
                message: 'Không tìm thấy quiz nào.',
                code: 'NO_QUIZZES_FOUND'
            });
        }
        return quizzes;
    }

    async findOne(id: string): Promise<Quizzes> {
        const quiz = await this.quizzesRepository.findOne({
            where: { quizz_id: id },
            relations: ['user', 'questions', 'results'],
        });

        if (!quiz) {
            throw new NotFoundException({
                message: `Quiz với ID ${id} không tồn tại.`,
                code: 'QUIZ_NOT_FOUND'
            });
        }
        return quiz;
    }

    async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
        try {
            const quiz = await this.findOne(id);

            // Update quiz details
            Object.assign(quiz, updateQuizDto);
            return this.quizzesRepository.save(quiz);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException({
                message: 'Có lỗi xảy ra trong quá trình cập nhật quiz.',
                code: 'UPDATE_QUIZ_FAILED'
            });
        }
    }

    async remove(id: string): Promise<void> {
        const quiz = await this.findOne(id);
        if (!quiz) {
            throw new NotFoundException({
                message: `Quiz với ID ${id} không tồn tại.`,
                code: 'QUIZ_NOT_FOUND'
            });
        }
        await this.quizzesRepository.delete(id);
    }
}
