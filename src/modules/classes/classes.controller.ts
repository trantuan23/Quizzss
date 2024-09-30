import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Classes } from './entities/class.entity';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
    constructor(
        private readonly classService: ClassesService
    ) { }

    @Post()
    create(@Body() createClassDto: CreateClassDto): Promise<Classes> {
        return this.classService.create(createClassDto)

    }

    @Get()
    findAll(): Promise<Classes[]> {
        return this.classService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Classes> {
        return this.classService.findOne(id)
    }

    @Put(':id')
    update(
        @Param('id') class_id: string,
        @Body() updateClassDto: UpdateClassDto
    ): Promise<Classes> {
        return this.classService.update(class_id, updateClassDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.classService.remove(id)
    }



}
