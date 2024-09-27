import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './entities/entities.option';
import { Repository } from 'typeorm';
import { Questions } from '../questions/entities/question.entities';
import { CreateOptionDto } from './dto/create-options.dto';
import { UpdateOptionDto } from './dto/update-options.dto';

@Injectable()
export class OptionsService {
    constructor(
        @InjectRepository(Options)
        private optionRepository:Repository<Options>,
        @InjectRepository(Questions)
        private questionRepository:Repository<Questions>
    ){}

    async create(createOptionDto:CreateOptionDto):Promise<Options>{
        console.log(createOptionDto);
        
        const question = await this.questionRepository.findOne({where:{question_id:createOptionDto.questionId}})
        const option = this.optionRepository.create({...createOptionDto,question})
        return this.optionRepository.save(option)

    }

    async findAll():Promise<Options[]>{
        return this.optionRepository.find({relations:['question']})
    }

    async findOne(id:string):Promise<Options>{
        return this.optionRepository.findOne({where:{option_id:id}, relations:['question']})
    }

    async update(id:string , updateOptionDto : UpdateOptionDto):Promise<Options>{
        await this.optionRepository.update(id,updateOptionDto)
        return this.findOne(id)
    }

    async remove(id:string):Promise<void>{
        await this.questionRepository.delete(id)
    }
}
