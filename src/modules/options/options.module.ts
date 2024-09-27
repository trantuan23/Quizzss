import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../questions/entities/question.entities';
import { Options } from './entities/entities.option';

@Module({
  imports:[TypeOrmModule.forFeature([Questions,Options])],
  providers: [OptionsService],
  controllers: [OptionsController]
})
export class OptionsModule {}
