import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizDto } from './dto/update-quizz.dto';
import { Classes } from '../classes/entities/class.entity';
import { Subjects } from '../subjects/entities/subject.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private readonly quizzesRepository: Repository<Quizzes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(Classes)
    private readonly classReponsitory: Repository<Classes>,

    @InjectRepository(Subjects)
    private readonly subjectReponsitory: Repository<Subjects>
  ) { }

  async create(createQuizDto: CreateQuizzDto): Promise<{ message: string; data: Quizzes }> {
    try {
      // Kiểm tra user
      const user = await this.usersRepository.findOne({
        where: { user_id: createQuizDto.userId },
      });
      if (!user) {
        throw new BadRequestException({
          message: `User với ID ${createQuizDto.userId} không tồn tại.`,
          code: 'USER_NOT_FOUND',
        });
      }

      // Kiểm tra class
      const cla = await this.classReponsitory.findOne({
        where: { class_id: createQuizDto.classId },
      });
      if (!cla) {
        throw new BadRequestException({
          message: `Class với ID ${createQuizDto.classId} không tồn tại.`,
          code: 'CLASS_NOT_FOUND',
        });
      }

      // Kiểm tra subject
      const sub = await this.subjectReponsitory.findOne({
        where: { subject_id: createQuizDto.subjectId },
      });
      if (!sub) {
        throw new BadRequestException({
          message: `Subject với ID ${createQuizDto.subjectId} không tồn tại.`,
          code: 'SUBJECT_NOT_FOUND',
        });
      }

      // Tạo quiz
      const quiz = this.quizzesRepository.create({
        ...createQuizDto,
        user, // Gắn user đã tìm được
        class: cla, // Gắn class đã tìm được
        subject: sub, // Gắn subject đã tìm được
      });

      const savedQuiz = await this.quizzesRepository.save(quiz);

      // Trả về thông báo thành công và dữ liệu
      return {
        message: 'Quiz đã được tạo thành công.',
        data: savedQuiz,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Có lỗi xảy ra trong quá trình tạo quiz.',
        code: 'CREATE_QUIZ_FAILED',
      });
    }
  }



  async findAll(): Promise<Quizzes[]> {
    const quizzes = await this.quizzesRepository.find({
      relations: ['user', 'questions', 'questions.answers', 'class', 'subject'],
    });

    if (!quizzes.length) {
      throw new NotFoundException({
        message: 'Không tìm thấy quiz nào.',
        code: 'NO_QUIZZES_FOUND',
      });
    }
    return quizzes;
  }

  async findOne(id: string): Promise<Quizzes> {
    const quiz = await this.quizzesRepository.findOne({
      where: { quizz_id: id },
      relations: ['user', 'questions', 'questions.answers', 'class', 'subject'],
    });

    if (!quiz) {
      throw new NotFoundException({
        message: `Quiz với ID ${id} không tồn tại.`,
        code: 'QUIZ_NOT_FOUND',
      });
    }

    // Sắp xếp đáp án của mỗi câu hỏi theo thứ tự A, B, C, D
    quiz.questions.forEach(question => {
      if (question.answers && question.answers.length > 0) {
        question.answers.sort((a, b) => {
          const answerOrder = ['A', 'B', 'C', 'D'];
          const orderA = answerOrder.indexOf(a.answer_text.charAt(0));
          const orderB = answerOrder.indexOf(b.answer_text.charAt(0));
          return orderA - orderB;
        });
      }
    });

    return quiz;
  }


  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    try {
      const quiz = await this.findOne(id);

      // Cập nhật userId nếu có
      if (updateQuizDto.userId) {
        const user = await this.usersRepository.findOne({ where: { user_id: updateQuizDto.userId } });
        if (user) {
          quiz.user = user;
        }
      }

      // Cập nhật classId nếu có
      if (updateQuizDto.classId) {
        const cla = await this.classReponsitory.findOne({ where: { class_id: updateQuizDto.classId } });
        if (cla) {
          quiz.class = cla;
        }
      }

      // Cập nhật subjectId nếu có
      if (updateQuizDto.subjectId) {
        const sub = await this.subjectReponsitory.findOne({ where: { subject_id: updateQuizDto.subjectId } });
        if (sub) {
          quiz.subject = sub;
        }
      }

      // Cập nhật các thuộc tính khác nếu có
      Object.assign(quiz, updateQuizDto);

      // Lưu lại quiz đã cập nhật
      return this.quizzesRepository.save(quiz);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Có lỗi xảy ra trong quá trình cập nhật quiz.',
        code: 'UPDATE_QUIZ_FAILED',
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
