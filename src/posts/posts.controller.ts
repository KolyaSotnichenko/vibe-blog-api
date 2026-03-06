import { Body, Controller, Post, Put, Param, NotFoundException } from '@nestjs/common';
import { PostsService, Post as BlogPost } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto): BlogPost {
    return this.postsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): BlogPost {
    const postId = Number(id);
    const updated = this.postsService.update(postId, dto);
    if (!updated) {
      throw new NotFoundException('Post not found');
    }
    return updated;
  }
}
