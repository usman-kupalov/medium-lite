
import { POST_REPOSITORY } from './post.constants';
import { Post } from './post.entity';

export const postProvider = [
  {
    provide: POST_REPOSITORY,
    useValue: Post
  }
];
