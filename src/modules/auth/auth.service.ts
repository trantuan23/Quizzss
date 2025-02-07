import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly jwtService: JwtService
    ) {}

    // Đăng ký người dùng mới
    async register(registerDto: RegisterDto): Promise<Users> {
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new BadRequestException('Email đã được sử dụng.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        const user = this.userRepository.create({ ...registerDto, password: hashedPassword });
        return this.userRepository.save(user);
    }

    // Đăng nhập và cấp access_token
    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng.');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng.');
        }

        const payload = { userId: user.user_id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

        // Lưu refresh token vào DB
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        await this.userRepository.update(user.user_id, { refresh_token: refreshToken });

        return { access_token: accessToken };
    }

    // Refresh access token từ refresh token
    async refreshAccessToken(refresh_token: string): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { refresh_token } });
        if (!user) {
            throw new UnauthorizedException('Refresh token không hợp lệ.');
        }

        try {
            // Xác minh refresh token
            const payload = this.jwtService.verify(refresh_token);
            const newAccessToken = this.jwtService.sign({ userId: user.user_id }, { expiresIn: '15m' });
            return { access_token: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token hết hạn hoặc không hợp lệ.');
        }
    }

    // Đăng xuất
    async logout(userId: string): Promise<{ message: string }> {
        await this.userRepository.update(userId, { refresh_token: null });
        return { message: 'Đăng xuất thành công' };
    }
}
