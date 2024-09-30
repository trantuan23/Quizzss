import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

// Role Enum
export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsEnum(UserRole, { message: 'Role must be student, teacher, or admin' })
    role: UserRole;

    @IsNotEmpty()
    classId:string
}
