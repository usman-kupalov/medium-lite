import { Controller, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query('limit') limit: number) {
    return this.userService.getAllUsers(limit);
  }
}
