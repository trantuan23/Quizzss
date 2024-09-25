import { Module } from '@nestjs/common';
import { DragDropAnswersController } from './dragdropanswers.controller';
import { DragDropAnswersService } from './dragdropanswers.service';

@Module({
  controllers: [DragDropAnswersController],
  providers: [DragDropAnswersService]
})
export class DragDropAnswersModule {}
