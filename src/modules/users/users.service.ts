import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,  // Đã sửa chính tả
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<Users[]> {
        return this.userRepository.find();
    }

    async findOne(user_id: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { user_id } });  // Đổi `user_id` thành `id` để trùng với entity
        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found!`);
        }
        return user;
    }

    async update(user_id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        const user = await this.userRepository.preload({
            user_id,
            ...updateUserDto,
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found!`);
        }
        return this.userRepository.save(user);  // Truyền đối tượng `user` khi lưu
    }

    async remove(user_id: string): Promise<void> {
        const user = await this.findOne(user_id);
        await this.userRepository.remove(user);
    }
}
