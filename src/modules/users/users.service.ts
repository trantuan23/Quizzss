import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Classes } from '../classes/entities/class.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Classes)
        private readonly classReponsitory: Repository<Classes>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const foundClass = await this.classReponsitory.findOne({ where: { class_id: createUserDto.classId } });
        const user = this.userRepository.create({ ...createUserDto, class: foundClass });
        return this.userRepository.save(user);
    }


    async findAll(): Promise<Users[]> {
        return this.userRepository.find({ relations: ['class'] });
    }

    async findOne(user_id: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: { user_id },
            relations: ['class'] 
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found!`);
        }
        return user;
    }


    async update(user_id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        await this.userRepository.update(user_id,updateUserDto)
        return this.findOne(user_id)
    }

    async remove(user_id: string): Promise<void> {
       await this.userRepository.delete(user_id)
    }
}
