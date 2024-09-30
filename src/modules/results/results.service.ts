import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Results } from './entities/results.entity/results.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Subjects } from '../subjects/entities/subject.entity';

@Injectable()
export class ResultsService {
    constructor (
        @InjectRepository(Results)
        private resultReponsitory:Repository<Results>,
        @InjectRepository(Users)
        private userReponsitory:Repository<Users>,
        @InjectRepository(Quizzes)
        private quizzReponsitory:Repository<Quizzes>,
        @InjectRepository(Subjects)
        private subjectReponsitory:Repository<Subjects>
    ){}

    async create(createResultDto:CreateResultDto):Promise<Results>{
        const user = await this.userReponsitory.findOne({where:{user_id:createResultDto.userId}}) 
        const quizz = await this.quizzReponsitory.findOne({where:{quizz_id:createResultDto.quizId}})
        const subject = await this.subjectReponsitory.findOne({where:{subject_id:createResultDto.subjectId}})
        const result = this.resultReponsitory.create({...createResultDto,user,quizz,subject})
        return this.resultReponsitory.save(result)
    }

    async findAll():Promise<Results[]>{
       return this.resultReponsitory.find({relations:['user','quizz']})
    }

    async findOne(id:string):Promise<Results>{
        const result = this.resultReponsitory.findOne({where:{result_id:id}})
        return result
     
        
    }

    async update(id:string,updateResultDto:UpdateResultDto):Promise<Results>{
        await this.resultReponsitory.update(id,updateResultDto)
        return this.findOne(id)
    }

    async remove(id:string):Promise<void>{
        await this.resultReponsitory.delete(id)
    }
}
