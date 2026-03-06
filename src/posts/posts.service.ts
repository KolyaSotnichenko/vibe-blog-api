import { fileStore, StoredPost } from '../db/sqlite';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export class PostsService {
  create(dto: CreatePostDto): Post {
    const store = fileStore.load();
    const nextId = store.posts.length > 0 ? Math.max(...store.posts.map(p => p.id)) + 1 : 1;
    const post: StoredPost = { id: nextId, title: dto.title, content: dto.content };
    store.posts.push(post);
    fileStore.save(store);
    return post;
  }

  update(id: number, dto: UpdatePostDto): Post | null {
    const store = fileStore.load();
    const index = store.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    const existing = store.posts[index];
    const updated: StoredPost = {
      id,
      title: dto.title ?? existing.title,
      content: dto.content ?? existing.content,
    };
    store.posts[index] = updated;
    fileStore.save(store);
    return updated;
  }

  delete(id: number): boolean {
    const store = fileStore.load();
    const initialLength = store.posts.length;
    store.posts = store.posts.filter(p => p.id !== id);
    if (store.posts.length === initialLength) {
      return false;
    }
    fileStore.save(store);
    return true;
  }

  findOne(id: number): Post | null {
    const store = fileStore.load();
    const existing = store.posts.find(p => p.id === id);
    return existing ?? null;
  }

  findAll(): Post[] {
    const store = fileStore.load();
    return store.posts;
  }
}
