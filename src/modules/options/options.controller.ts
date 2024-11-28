import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-options.dto';
import { UpdateOptionDto } from './dto/update-options.dto';

@Controller('options')
export class OptionsController {
    constructor(private readonly optionService: OptionsService) {}

    @Post()
    async create(@Body() createOptionDto: CreateOptionDto) {
        const result = await this.optionService.create(createOptionDto);
        return {
            status: 201,
            message: result.message,
            data: result.data
        };
    }

    @Get()
    async findAll() {
        const result = await this.optionService.findAll();
        return {
            status: 200,
            message: result.message,
            data: result.data
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.optionService.findOne(id);
        return {
            status: 200,
            message: result.message,
            data: result.data
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
        const result = await this.optionService.update(id, updateOptionDto);
        return {
            status: 200,
            message: result.message,
            data: result.data
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const result = await this.optionService.remove(id);
        return {
            status: 200,
            message: result.message
        };
    }
}
