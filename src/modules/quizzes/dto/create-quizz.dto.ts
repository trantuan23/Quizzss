import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuizzDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  subjectId: string

  @IsNotEmpty()
  classId: string




}