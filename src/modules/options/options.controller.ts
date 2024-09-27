import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-options.dto';
import { Options } from './entities/entities.option';
import { UpdateOptionDto } from './dto/update-options.dto';

@Controller('options')
export class OptionsController {
    constructor (
        private readonly optionService:OptionsService
    ){}

    @Post()
    create(@Body() createOptionDto:CreateOptionDto):Promise<Options>{
       return this.optionService.create(createOptionDto)
    }

    @Get()
    findAll():Promise<Options[]>{
        return this.optionService.findAll()
    }

    @Get(':id')
    findOne(id:string):Promise<Options>{
        return this.optionService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() updateOptionDto:UpdateOptionDto ):Promise<Options>{
        return this.optionService.update(id,updateOptionDto)
    }

    @Delete(':id')
    delete(@Param('id') id:string):Promise<void>{
        return this.optionService.remove(id)
    }



}
