import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { Results } from './entities/results.entity/results.entity';
import { UpdateResult } from 'typeorm';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('results')
export class ResultsController {
    constructor(private readonly resultService:ResultsService){}

    @Post()
    create(@Body() createResultDto:CreateResultDto):Promise<Results>{
        return this.resultService.create(createResultDto)
    }

    @Get()
    findAll():Promise<Results[]>{
        return this.resultService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string):Promise<Results>{
        return this.resultService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() updateResultDto:UpdateResultDto):Promise<Results>{
        return this.resultService.update(id,updateResultDto)
    }

    @Delete(':id')
    remove(@Param('id') id:string):Promise<void>{
      return this.resultService.remove(id)
    }
}

