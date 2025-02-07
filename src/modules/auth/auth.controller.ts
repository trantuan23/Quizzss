import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Đăng ký người dùng mới
    @Post('register')
    register(@Body() createUserDto: RegisterDto) {
        return this.authService.register(createUserDto);
    }

    // Đăng nhập và trả về access token
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // Refresh access token từ refresh token
    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refresh_token: string) {
        if (!refresh_token) {
            throw new UnauthorizedException('Refresh token không được để trống');
        }
        return this.authService.refreshAccessToken(refresh_token);
    }

    // Đăng xuất và xóa refresh token
    @Post('logout')
    async logout(@Body('userId') userId: string) {
        return this.authService.logout(userId);
    }
}
