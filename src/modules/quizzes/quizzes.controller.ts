import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './entities/quizzes.entity';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizDto } from './dto/update-quizz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizzDto): Promise<Quizzes> {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  findAll(): Promise<Quizzes[]> {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quizzes> {
    return this.quizzesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.quizzesService.remove(id);
  }
}
