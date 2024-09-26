import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuizzDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  userId: string;

}