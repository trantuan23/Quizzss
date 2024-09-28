import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DragDropAnswersService } from './dragdropanswers.service';
import { CreateDragDropAnswerDto } from './entities/dto/create.dto';
import { DragDropAnswers } from './entities/dragdropanswer.entity/dragdropanswer.entity';
import { UpdateDragDropAnswerDto } from './entities/dto/update.dto';


@Controller('dragdropanswers')
export class DragDropAnswersController {
    constructor(
        private readonly dragService: DragDropAnswersService
    ) { }

    @Post()
    create(@Body() createDrag: CreateDragDropAnswerDto): Promise<DragDropAnswers> {
        return this.dragService.create(createDrag)
    }

    @Get()
    findAll(): Promise<DragDropAnswers[]> {
        return this.dragService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<DragDropAnswers> {
        return this.dragService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDrag: UpdateDragDropAnswerDto): Promise<DragDropAnswers> {
        return this.dragService.update(id, updateDrag);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.dragService.remove(id)
    }


}
