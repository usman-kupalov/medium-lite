import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/user/auth/guard/auth.guard';

@Controller('/posts')
export class PostController {

  constructor(private readonly postSerivce: PostService) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async createPost(@Body() dto: CreatePostDto, @Req() request) {
    return this.postSerivce.createPost(dto, request.user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllPostOfUser(@Query('limit') limit: number, @Req() request) {
    const { user } = request;
    return this.postSerivce.getAllPostOfUser(user.id, limit);
  }

  @Get('/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postSerivce.findPostById(id);
  }
}
