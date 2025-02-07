import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    create(@Body() createUser: CreateUserDto): Promise<Users> {
        return this.userService.create(createUser);
    }

    @Get()
   // @UseGuards(AuthGuard('jwt'))
    findAll(): Promise<Users[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') user_id: string): Promise<Users> {
        return this.userService.findOne(user_id)
    }


    @Put(':id')
    update(@Param('id') user_id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.userService.update(user_id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') user_id: string): Promise<void> {
        return this.userService.remove(user_id)
    }

    @Post('approve/:id')
    async approve(@Param('id') user_id: string): Promise<Users> {
        return this.userService.approveAccount(user_id);
    }

    @Post('deactivate/:id')
    async deactivate(@Param('id') user_id: string): Promise<Users> {
        return this.userService.deactivateAccount(user_id);
    }

    @Post('logout')
    async logout(@Body('userId') userId: number) {
        return this.userService.logout(userId);
    }


}
