import { Module } from '@nestjs/common';
import { AudioguessesService } from './audioguesses.service';
import { AudioguessesController } from './audioguesses.controller';

@Module({
  providers: [AudioguessesService],
  controllers: [AudioguessesController]
})
export class AudioGuessesModule {}
