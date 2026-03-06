import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
// Database removed; using file-based storage

@Module({
  imports: [PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
