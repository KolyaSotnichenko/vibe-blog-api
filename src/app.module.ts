import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqliteDataSource } from './db/sqlite';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteDataSource.options), PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
