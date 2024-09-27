import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questions } from './entities/question.entities';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionService:QuestionsService
    ){}

    @Post()
    create(@Body() createQuestionDto:CreateQuestionDto):Promise<Questions>{
        return this.questionService.create(createQuestionDto)
    }

    @Get()
    findAll():Promise<Questions[]>{
        return this.questionService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string):Promise<Questions>{
        return this.questionService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() updateQuestionDto:UpdateQuestionDto):Promise<Questions>{
        return this.questionService.update(id,updateQuestionDto)
    }

    @Delete(':id')
    remove(@Param('id') id:string):Promise<void>{
        return this.questionService.remove(id)
    }
}
