import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {  UserRole, Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createUser: CreateUserDto): Promise<Users> {
        return this.userService.create(createUser);
    }

    @Get()
     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(UserRole.ADMIN)
     findAll(): Promise<Users[]> {
      return this.userService.findAll();
    }
    

    @Get(':id')
    findOne(@Param('id') user_id: string): Promise<Users> {
        return this.userService.findOne(user_id)
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(@Param('id') user_id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.userService.update(user_id, updateUserDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') user_id: string): Promise<void> {
        return this.userService.remove(user_id)
    }

    @Post('approve/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(UserRole.ADMIN)
    async approve(@Param('id') user_id: string): Promise<Users> {
        return this.userService.approveAccount(user_id);
    }

    @Post('deactivate/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deactivate(@Param('id') user_id: string): Promise<Users> {
        return this.userService.deactivateAccount(user_id);
    }

    @Post('logout')
    async logout(@Body('userId') userId: number) {
        return this.userService.logout(userId);
    }


}
