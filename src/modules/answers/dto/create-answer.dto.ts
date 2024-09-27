import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAnswerDto{
    @IsNotEmpty()
    answer_text: string;

    @IsNotEmpty()
    userId:string

}