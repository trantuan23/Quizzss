import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import { Classes } from '../classes/entities/class.entity';
import { UsersController } from '../users/users.controller';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Classes]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, JwtStrategy, JwtGuard,AuthService],
})
export class AuthModule {}
