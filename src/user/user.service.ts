import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITPRY } from './user.constants';
import { User } from './user.entity';
import { CreateUserDto } from './auth/dto/user.create.dto';
import { hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Post } from 'src/post/post.entity';
import { BadRequestException } from 'src/filter/exceptions';

@Injectable()
export class UserService {
  constructor (
    @Inject(USER_REPOSITPRY) private readonly userRepository: typeof User,
    private readonly configService: ConfigService
  ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
      const hashedPassword = await this.hashPassword(dto.password);
      const newUser = new User({
        email: dto.email,
        password: hashedPassword
      });
      return newUser.save();
    }

    async hashPassword(password: string): Promise<string> {
      const hashedPassword = await hash(password, Number(this.configService.get('SALT')));
      return hashedPassword;
    }

    async findUserByEmail (email: string): Promise<User> {
      return this.userRepository.findOne({ where: { email: email }});
    }

    async checkPassword(inputPassword: string, userPassword: string): Promise<void> {
      const check = await compare(inputPassword, userPassword);
      if (!check) throw new BadRequestException('Bad credentials');
      return;
    }

    async getAllUsers(limit: number): Promise<User[]> {
      return this.userRepository.findAll({ limit: limit });
    }

    async findUserById(id: number): Promise<User> {
      return this.userRepository.findOne({ where: { id: id }, include: [Post] });
    }

    async updateUserRating(id: number, rating: number): Promise<void> {
      this.userRepository.update({ rating: rating }, { where: { id: id } });
    }
}
