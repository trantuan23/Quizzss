import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AudioguessesService } from './audioguesses.service';
import { CreateAudioGuessDto } from './dto/create-audioguessses.dto';
import { AudioGuesses } from './entities/audioguesses.entity';
import { UpdateAudioGuessDto } from './dto/update-audioguessses.dto';

@Controller('audioguesses')
export class AudioguessesController {
    constructor(
        private readonly audioGuessService: AudioguessesService
    ) { }

    @Post()
    create(@Body() createAudioGuessDto: CreateAudioGuessDto): Promise<AudioGuesses> {
        return this.audioGuessService.create(createAudioGuessDto);
    }

    @Get()
    findAll(): Promise<AudioGuesses[]> {
        return this.audioGuessService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<AudioGuesses> {
        return this.audioGuessService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAudioGuessDto: UpdateAudioGuessDto): Promise<AudioGuesses> {
        return this.audioGuessService.update(id, updateAudioGuessDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.audioGuessService.remove(id);
    }
}
