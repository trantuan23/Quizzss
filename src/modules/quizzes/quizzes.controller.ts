import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './entities/quizzes.entity';
import { UpdateQuizDto } from './dto/update-quizz.dto';
import { CreateQuizDto } from './dto/create-quizz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    const result = await this.quizzesService.create(createQuizDto);
    return result;
  }


  @Get()
  async findAll(): Promise<{ message: string; data: Quizzes[] }> {
    const quizzes = await this.quizzesService.findAll();
    return quizzes
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
