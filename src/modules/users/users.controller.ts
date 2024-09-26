import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post()
    create(@Body()createUser:CreateUserDto):Promise<Users>{
        return this.userService.create(createUser);
    }

    @Get()
    findAll():Promise<Users[]>{
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') user_id:string):Promise<Users>{
        return this.userService.findOne(user_id)
    }
    

    @Put(':id')
    update(@Param('id') user_id:string,@Body() updateUserDto:UpdateUserDto):Promise<Users>{
        return this.userService.update(user_id,updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') user_id:string):Promise<void>{
        return this.userService.remove(user_id)
    }


}
