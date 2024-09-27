import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answers } from './entities/answers.entities';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersSevice: AnswersService) { }

    @Post()
    create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answers> {
        return this.answersSevice.create(createAnswerDto)
    }

    @Get()
    findAll(): Promise<Answers[]> {
        return this.answersSevice.findAll()
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto): Promise<Answers> {
        return this.answersSevice.update(id, updateAnswerDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Answers> {
        return this.answersSevice.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.answersSevice.remove(id)
    }




}
