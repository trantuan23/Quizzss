import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  score: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string; 

  @IsNotEmpty()
  @IsUUID()
  quizId: string; 

  @IsNotEmpty()
  @IsUUID()
  subjectId:string
}
