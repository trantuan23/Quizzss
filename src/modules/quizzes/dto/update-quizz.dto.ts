import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  time?: number;

  @IsOptional()
  @IsString()
  userId?: string;
}