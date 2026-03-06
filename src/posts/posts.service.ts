import { db } from '../db/sqlite';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export class PostsService {
  findAll(): Post[] {
    const rows = db.prepare('SELECT id, title, content FROM posts ORDER BY id ASC').all() as Post[];
    return rows;
  }
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

  update(id: number, dto: UpdatePostDto): Post | null {
    const existing = db.prepare('SELECT id, title, content FROM posts WHERE id = ?').get(id) as Post | undefined;
    if (!existing) {
      return null;
    }
    const title = dto.title ?? existing.title;
    const content = dto.content ?? existing.content;
    db.prepare('UPDATE posts SET title = ?, content = ? WHERE id = ?').run(title, content, id);
    return { id, title, content };
  }
}
