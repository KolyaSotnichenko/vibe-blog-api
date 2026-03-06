import { db } from '../db/sqlite';
import { CreatePostDto } from './dto/create-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export class PostsService {
  create(dto: CreatePostDto): Post {
    const stmt = db.prepare(
      'INSERT INTO posts (title, content) VALUES (?, ?)'
    );
    const result = stmt.run(dto.title, dto.content);
    return {
      id: Number(result.lastInsertRowid),
      title: dto.title,
      content: dto.content,
    };
  }
}
