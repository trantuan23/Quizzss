import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioGuesses } from './entities/audioguesses.entity';
import { Repository } from 'typeorm';
import { Questions } from '../questions/entities/question.entities';
import { CreateAudioGuessDto } from './dto/create-audioguessses.dto';
import { UpdateAudioGuessDto } from './dto/update-audioguessses.dto';

@Injectable()
export class AudioguessesService {
    constructor(
        @InjectRepository(AudioGuesses)
        private audioguesRepository: Repository<AudioGuesses>,
        @InjectRepository(Questions)
        private questionRespository: Repository<Questions>
    ) { }

    async create(createAudioGuessDto: CreateAudioGuessDto): Promise<AudioGuesses> {
        const question = await this.questionRespository.findOne({ where: { question_id: createAudioGuessDto.questionId } });
        if (!question) {
            throw new BadRequestException('Question not found!');
        }
        const audio = this.audioguesRepository.create({ ...createAudioGuessDto, question });
        return this.audioguesRepository.save(audio);
    }

    async findAll(): Promise<AudioGuesses[]> {
        return this.audioguesRepository.find({ relations: ['question'] });
    }

    async findOne(id: string): Promise<AudioGuesses> {
        const audioGuess = await this.audioguesRepository.findOne({ where: { audio_guess_id: id }, relations: ['question'] });
        if (!audioGuess) {
            throw new BadRequestException('AudioGuess not found!');
        }
        return audioGuess;
    }

    async update(id: string, updateAudioGuessDto: UpdateAudioGuessDto): Promise<AudioGuesses> {
        await this.audioguesRepository.update(id, updateAudioGuessDto);

        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const audioGuess = await this.findOne(id);
        if (!audioGuess) {
            throw new BadRequestException('AudioGuess not found!');
        }
        await this.audioguesRepository.delete(id);
    }
}
