import { USER_REPOSITPRY } from './user.constants';
import { User } from './user.entity';

export const userProvider = [
  { 
    provide: USER_REPOSITPRY, useValue: User
  }
]