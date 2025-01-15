import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Results } from './entities/results.entity/results.entity';
import { In, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Subjects } from '../subjects/entities/subject.entity';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { Answers } from '../answers/entities/answers.entities';

@Injectable()
export class ResultsService {
    constructor (
        @InjectRepository(Results)
        private resultReponsitory:Repository<Results>,
        @InjectRepository(Users)
        private userReponsitory:Repository<Users>,
        @InjectRepository(Subjects)
        private subjectReponsitory:Repository<Subjects>,
        @InjectRepository(Quizzes)
        private quizzesReponsitory:Repository<Quizzes>,
        @InjectRepository(Answers)
        private answerReponsitory: Repository<Answers>,
         

    ){}

    async create(createResultDto: CreateResultDto): Promise<Results> {
        try {
            const user = await this.userReponsitory.findOne({ where: { user_id: createResultDto.userId } });
            if (!user) {
                throw new Error('User not found');
            }
    
            const quizzes = await this.quizzesReponsitory.findOne({where:{quizz_id:createResultDto.quizId}})
    
            if (!quizzes) {
                throw new Error('Quizz not found');
            }
    
            const subject = await this.subjectReponsitory.findOne({ where: { subject_id: createResultDto.subjectId } });
            if (!subject) {
                throw new Error('Subject not found');
            }
    
            // Tính số câu đúng
            const correctAnswersCount = createResultDto.answers.filter(answer => answer.selected_answer.is_conrrect).length;
    
            // Tính điểm
            const totalQuestions = createResultDto.answers.length;
            const score = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;
    
            // Extract answer_ids from the answers array
            const answer_ids = createResultDto.answers.map(answer => answer.selected_answer.answer_id);
    
            // Tạo object result
            const result = this.resultReponsitory.create({
                score,
                user,
                quizzes,
                subject,
                answer_ids,  // Store answer_ids here
            });
    
            return await this.resultReponsitory.save(result);
        } catch (error) {
            throw new Error(`Failed to create result: ${error.message}`);
        }
    }
    
    

    async findAll():Promise<Results[]>{
       return this.resultReponsitory.find({relations:['user','quizzes']})
    }

    async findOne(id: string): Promise<any> {
        // Lấy thông tin kết quả từ bảng Results
        const result = await this.resultReponsitory.findOne({
            where: { result_id: id },
            relations: ['quizzes.questions.answers'],
        });
    
        if (!result) {
            throw new Error(`Result with id ${id} not found`);
        }
    
        // Lấy danh sách `answer_ids` từ kết quả
        const { answer_ids } = result;
    
        // Truy vấn để lấy danh sách câu trả lời (answers) dựa trên `answer_ids`
        const selectedAnswers = await this.answerReponsitory.find({
            where: {
                answer_id: In(answer_ids),
            },
        });
    
    
        // Gắn thông tin câu trả lời đã chọn và thông tin quiz vào kết quả
        return {
            ...result,
            selectedAnswers
        };
    }
    
    
    
    
    

    async update(id:string,updateResultDto:UpdateResultDto):Promise<Results>{
        await this.resultReponsitory.update(id,updateResultDto)
        return this.findOne(id)
    }

    async remove(id:string):Promise<void>{
        await this.resultReponsitory.delete(id)
    }
}
