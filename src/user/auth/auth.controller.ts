import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user.login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    await this.authService.register(dto);
    return { message: 'Succeffuly registered' };
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}