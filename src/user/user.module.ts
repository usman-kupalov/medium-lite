import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/guard/auth.guard';

@Module({
  providers: [UserService, ...userProvider, AuthService, AuthGuard],
  controllers: [UserController, AuthController],
  imports: [ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  })],
  exports: [UserService]
})
export class UserModule {}
