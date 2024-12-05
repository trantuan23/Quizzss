import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UpdateAnswerDto{
    @IsNotEmpty()
    answer_text: string;
    @IsNotEmpty()
    is_conrrect: boolean;


}