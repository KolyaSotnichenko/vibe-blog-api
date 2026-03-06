import { Body, Controller, Post } from '@nestjs/common';
import { PostsService, Post as BlogPost } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto): BlogPost {
    return this.postsService.create(dto);
  }
}
