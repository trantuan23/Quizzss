import { Injectable, NotFoundException } from '@nestjs/common';
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
        private optionRepository: Repository<Options>,
        @InjectRepository(Questions)
        private questionRepository: Repository<Questions>,
    ) {}

    async create(createOptionDto: CreateOptionDto): Promise<{ message: string, data: Options }> {
        console.log(createOptionDto);
        const question = await this.questionRepository.findOne({ where: { question_id: createOptionDto.questionId } });
        const option = this.optionRepository.create({ ...createOptionDto, question });
        const savedOption = await this.optionRepository.save(option);

        return {
            message: 'Tạo option thành công!',
            data: savedOption
        };
    }

    async findAll(): Promise<{ message: string, data: Options[] }> {
        const options = await this.optionRepository.find({ relations: ['question'] });
        return {
            message: 'Lấy danh sách options thành công!',
            data: options
        };
    }

    async findOne(id: string): Promise<{ message: string, data: Options }> {
        const option = await this.optionRepository.findOne({ where: { option_id: id }, relations: ['question'] });

        if (!option) {
            throw new NotFoundException(`Không tìm thấy option có ID: ${id}`);
        }

        return {
            message: 'Lấy thông tin option thành công!',
            data: option
        };
    }

    async update(id: string, updateOptionDto: UpdateOptionDto): Promise<{ message: string, data: Options }> {
        await this.optionRepository.update(id, updateOptionDto);
        const updatedOption = await this.findOne(id);
        return {
            message: 'Cập nhật option thành công!',
            data: updatedOption.data
        };
    }

    async remove(id: string): Promise<{ message: string }> {
        const option = await this.findOne(id);

        if (!option) {
            throw new NotFoundException(`Không tìm thấy option có ID: ${id}`);
        }

        await this.optionRepository.delete(id);
        return {
            message: 'Xoá option thành công!'
        };
    }
}
