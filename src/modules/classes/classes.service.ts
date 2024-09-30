import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/class.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Classes)
        private classRepository: Repository<Classes>,
    ) { }

    async create(createClassDto: CreateClassDto): Promise<Classes> {
        const classes = this.classRepository.create(createClassDto);
        return this.classRepository.save(classes);
    }

    async findAll():Promise<Classes[]>{
        return this.classRepository.find()
    }

    async findOne(id: string): Promise<Classes> {
        await this.classRepository.findOne({ where: { class_id: id } })
        return this.findOne(id)
    }

    async update(id: string, updateClassDto: UpdateClassDto): Promise<Classes> {
        await this.classRepository.update(id, updateClassDto)
        return this.findOne(id)

    }

    async remove(id: string): Promise<void> {
        await this.classRepository.delete(id)
    }







}
