import { User } from 'src/user/user.entity';

export class FindUserPostDto {
  readingTime: number;
  id: number;
  title: string;
  content: string;
  rating: number;
  userId: number;
  user: User;
  createdAt?: any;
  updatedAt?: any;
}