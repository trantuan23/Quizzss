import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Classes } from '../classes/entities/class.entity';
import { UserRole } from './dto/create-user.dto'; // Import enum UserRole
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Classes)
        private readonly classRepository: Repository<Classes>,
        private readonly jwtService: JwtService 
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        try {
            // Kiểm tra trùng email
            const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
            if (existingUser) {
                throw new BadRequestException({
                    message: 'Email đã được sử dụng.',
                    code: 'USER_EMAIL_EXISTS'
                });
            }
    
            // Nếu role là STUDENT, phải chọn lớp
            if (createUserDto.role === UserRole.STUDENT) {
                if (!createUserDto.classId) {
                    throw new BadRequestException({
                        message: 'Lớp học không được bỏ trống !',
                        code: 'STUDENT_CLASS_REQUIRED'
                    });
                }
    
                const foundClass = await this.classRepository.findOne({ where: { class_id: createUserDto.classId } });
                if (!foundClass) {
                    throw new BadRequestException({
                        message: `Lớp học với ID ${createUserDto.classId} không tồn tại.`,
                        code: 'CLASS_NOT_FOUND'
                    });
                }
    
                // Băm mật khẩu trước khi tạo người dùng
                const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
                const user = this.userRepository.create({ 
                    ...createUserDto, 
                    password: hashedPassword, 
                    class: foundClass 
                });
                return this.userRepository.save(user);
    
            } else {
                // Nếu role không phải là STUDENT, không cho phép chọn lớp
                if (createUserDto.classId) {
                    throw new BadRequestException({
                        message: 'Chỉ học sinh mới có thể chọn lớp.',
                        code: 'INVALID_ROLE_CLASS_SELECTION'
                    });
                }
    
                // Băm mật khẩu trước khi tạo người dùng
                const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
                const user = this.userRepository.create({ 
                    ...createUserDto, 
                    password: hashedPassword 
                });
                return this.userRepository.save(user);
            }
        } catch (error) {
            // Gửi lại lỗi nếu là BadRequestException
            if (error instanceof BadRequestException) {
                throw error;
            }
    
            throw new BadRequestException({
                message: 'Có lỗi xảy ra trong quá trình tạo người dùng.',
                code: 'CREATE_USER_FAILED'
            });
        }
    }
    
    

    async findAll(): Promise<Users[]> {
        const users = await this.userRepository.find({
            relations: ['class'],
            order: {
                username: 'ASC', // Sắp xếp theo tên tài khoản A-Z
            },
        });
    
        if (!users.length) {
            throw new NotFoundException('No users found.');
        }
    
        return users;
    }
    

    async findOne(user_id: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: { user_id },
            relations: ['results', 'results.quizzes','results.quizzes.class','results.quizzes.subject', 'results.quizzes.questions', 'results.quizzes.questions.answers','class'],
        });
    
        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found.`);
        }
    
        return user;
    }
    

    async update(user_id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        try {
            const user = await this.findOne(user_id);
    
            // Kiểm tra trùng email (ngoại trừ email của chính user đang được cập nhật)
            const existingUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
            if (existingUser && existingUser.user_id !== user_id) {
                throw new BadRequestException({
                    message: 'Email đã được sử dụng.',
                    code: 'USER_EMAIL_EXISTS'
                });
            }
    
            // Nếu role là STUDENT, phải chọn lớp
            if (updateUserDto.role === UserRole.STUDENT) {
                if (!updateUserDto.classId) {
                    throw new BadRequestException({
                        message: 'Học sinh phải được chỉ định vào một lớp.',
                        code: 'STUDENT_CLASS_REQUIRED'
                    });
                }
    
                const foundClass = await this.classRepository.findOne({ where: { class_id: updateUserDto.classId } });
                if (!foundClass) {
                    throw new BadRequestException({
                        message: `Lớp học với ID ${updateUserDto.classId} không tồn tại.`,
                        code: 'CLASS_NOT_FOUND'
                    });
                }
                user.class = foundClass;
    
            } else {
                // Nếu role không phải là STUDENT, không cho phép chọn lớp
                if (updateUserDto.classId) {
                    throw new BadRequestException({
                        message: 'Chỉ học sinh mới có thể chọn lớp.',
                        code: 'INVALID_ROLE_CLASS_SELECTION'
                    });
                }
    
                // Xóa thông tin lớp nếu vai trò không phải STUDENT
                user.class = null;
            }
    
            Object.assign(user, updateUserDto);
            return this.userRepository.save(user);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
    
            throw new BadRequestException({
                message: 'Có lỗi xảy ra trong quá trình cập nhật người dùng.',
                code: 'UPDATE_USER_FAILED'
            });
        }
    }

    async approveAccount(user_id: string): Promise<Users> {
        const user = await this.findOne(user_id);

        // Kiểm tra nếu người dùng đã được phê duyệt
        if (user.isActive) {
            throw new BadRequestException({
                message: 'Tài khoản này đã được phê duyệt.',
                code: 'USER_ALREADY_APPROVED'
            });
        }

        user.isActive = true;

        return this.userRepository.save(user);
    }

    async deactivateAccount(user_id: string): Promise<Users> {
        const user = await this.findOne(user_id);
    
        // Kiểm tra nếu người dùng đã bị hủy kích hoạt
        if (!user.isActive) {
            throw new BadRequestException({
                message: 'Tài khoản này đã bị hủy kích hoạt.',
                code: 'USER_ALREADY_DEACTIVATED'
            });
        }
    
        user.isActive = false;
    
        return this.userRepository.save(user);
    }
    


    async logout(userId: number): Promise<{ message: string }> {
        await this.userRepository.update(userId, { refresh_token: null });
        return { message: 'Đăng xuất thành công' };
    }
    
    

    async remove(user_id: string): Promise<void> {
        const user = await this.findOne(user_id); 
        await this.userRepository.delete(user_id);
    }
}
