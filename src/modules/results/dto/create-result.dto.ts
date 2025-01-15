import { IsUUID, IsNotEmpty, IsArray, ValidateNested, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

class SelectedAnswerDto {
    @IsUUID()
    answer_id: string;

    @IsNotEmpty()
    answer_text: string;

    @IsNotEmpty()
    is_conrrect: boolean;
}

class AnswerDto {
    @IsUUID()
    question_id: string;

    @IsNotEmpty()
    question_text: string;

    @ValidateNested()
    @Type(() => SelectedAnswerDto)
    selected_answer: SelectedAnswerDto;
}

export class CreateResultDto {
    @IsUUID()
    quizId: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    subjectId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}
