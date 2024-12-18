import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthMiddleware } from './auth.middleware';
import { UserService } from './user.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthMiddleware)
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('date') date: Date,
    @Body('googleId') googleId: string,
  ) {
    try {
      const user = await this.userService.findByGoogleId(googleId);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const createdPost = await this.postService.createPost(
        { title, content, date },
        user._id,
      );

      return createdPost;
    } catch (error) {
      return { message: error.message };
    }
  }

  @Post('user')
  async getPostsByUser(@Body() body) {
    try {
      const googleId = body.googleId;
      const user = await this.userService.findByGoogleId(googleId);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const posts = await this.postService.getPostsByUser(user._id);

      return posts;
    } catch (error) {
      return { message: error.message };
    }
  }
}
