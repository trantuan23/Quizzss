import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAnswerDto{
    @IsNotEmpty()
    answer_text: string;

    @IsNotEmpty()
    is_conrrect: boolean;
     
    // @IsNotEmpty()
    // userId:string

    @IsNotEmpty()
    questionId:string



}