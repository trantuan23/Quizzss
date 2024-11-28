import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  option_text?: string;

  @IsOptional()
  @IsString()
  is_correct?: string;

}