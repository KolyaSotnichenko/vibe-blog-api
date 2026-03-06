import { Body, Controller, Post, Put, Param, NotFoundException, Delete, HttpCode, Get } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const postId = Number(id);
    const deleted = this.postsService.delete(postId);
    if (!deleted) {
      throw new NotFoundException('Post not found');
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): BlogPost {
    const post = this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException({ error: 'Post not found', code: 'POST_NOT_FOUND' });
    }
    return post;
  }

  @Get()
  findAll(): BlogPost[] {
    return this.postsService.findAll();
  }
}
