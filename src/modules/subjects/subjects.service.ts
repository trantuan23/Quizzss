import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subjects } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subjects)
        private subjectRepository: Repository<Subjects>
    ) { }


    async create(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
        const sub = await this.subjectRepository.create(createSubjectDto)
        return this.subjectRepository.save(sub)
    }

    async findAll(): Promise<Subjects[]> {
        return this.subjectRepository.find()
    }

    async findOne(subject_id: string): Promise<Subjects> {
        return await this.subjectRepository.findOne({where:{subject_id}})
    }


    async update(subject_id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subjects> {
        await this.subjectRepository.update(subject_id, updateSubjectDto)
        return this.findOne(subject_id)
    }

    async remove(subject_id : string):Promise<void>{
        await this.subjectRepository.delete(subject_id)
    }


}
