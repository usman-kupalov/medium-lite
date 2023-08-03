import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY, WORDS_PER_MINUTE } from './post.constants';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/post.dto';
import { NotFoundException } from 'src/filter/exceptions';
import { FindUserPostDto } from './dto/find.user.post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
    private readonly userService: UserService
  ) {}

  async createPost(dto: CreatePostDto, userId: number): Promise<Post> {
    const newPost = new Post({
      title: dto.title,
      content: dto.content,
      rating: 0, // initial value
      userId: userId
    });

    const userRating = await this.calcuateRatingOfUser(userId);
    await this.userService.updateUserRating(userId, userRating);

    return newPost.save();
  }

  async getAllPostOfUser(userId: number, limit: number): Promise<FindUserPostDto[]> {
    const posts = await this.postRepository.findAll(
      {
        where: {
          userId: userId
        }, 
        limit: limit
      });
    const postsWithReadingTime = await Promise.all(posts.map(async (post) => {
    const readingTime = await this.estimeReadingTime(post.content);
    return { ...post.toJSON(), readingTime };
    }));
    return postsWithReadingTime;
  }

  async findPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findByPk(id);
    if (!post) throw new NotFoundException();

    await this.postRepository.update({ rating: post.rating + 1 }, { where: { id: id } });
    const userRating = await this.calcuateRatingOfUser(post.userId);
    await this.userService.updateUserRating(post.userId, userRating);

    return post;
  }

  async estimeReadingTime(text: string): Promise<number> {
    const words = text.split(/\s/g).length;
    const minutes = words / WORDS_PER_MINUTE;
    return Math.ceil(minutes);
  }

  async calcuateRatingOfUser(userId: number): Promise<number> {
    const userPosts = await this.postRepository.findAll({ where: { userId: userId } });
    const postsRating = userPosts.map(post => post.rating || 0);
    const totalPostRating = postsRating.reduce((sum, rating) => sum + rating, 0);
    return totalPostRating /userPosts.length;
  }
}
