import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { QuestionType } from "../entities/question.entities";

export class UpdateQuestionDto {
    @IsNotEmpty()
    @IsString()
    question_text: string;

    @IsNotEmpty()
    @IsEnum(QuestionType)
    question_type: QuestionType;

    @IsOptional()
    @IsUrl()
    media_url?: string;
}