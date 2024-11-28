import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  option_text: string;

  @IsOptional()
  @IsString()
  is_correct?: string;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;
}
