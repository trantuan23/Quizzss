import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  option_text: string;

  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;
}
