import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from '../user.service';
import { LoginUserDto } from './dto/user.login.dto';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from 'src/filter/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService) {}

  async login ({ email, password }: LoginUserDto): Promise<Object> {
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser) throw new NotFoundException();
    await this.userService.checkPassword(password, existingUser.password);

    const payload = { id: existingUser.id, email };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET')
      })
    }
  }

  async register (dto: CreateUserDto): Promise<void> {
    const existingUser = await this.userService.findUserByEmail(dto.email);
    if (existingUser) throw new BadRequestException();
    this.userService.createUser(dto);
  }
}