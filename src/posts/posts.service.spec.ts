import { PostsService, Post } from './posts.service';
import { db } from '../db/sqlite';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  const service = new PostsService();

  beforeEach(() => {
    db.exec('DELETE FROM posts');
  });

  describe('create', () => {
    it('creates post with valid data', () => {
      const dto: CreatePostDto = { title: 't', content: 'c' };

      const result = service.create(dto);

      expect(result.id).toBeGreaterThan(0);
      expect(result.title).toBe(dto.title);
      expect(result.content).toBe(dto.content);
    });
  });

  describe('findOne', () => {
    it('returns post if exists', () => {
      const created = service.create({ title: 't', content: 'c' });

      const found = service.findOne(created.id);

      expect(found).toEqual(created);
    });

    it('returns null if not found', () => {
      const found = service.findOne(999);
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('updates existing post', () => {
      const created = service.create({ title: 't', content: 'c' });
      const dto: UpdatePostDto = { title: 't2' };

      const updated = service.update(created.id, dto) as Post;

      expect(updated.title).toBe('t2');
      expect(updated.content).toBe('c');
    });

    it('returns null if post does not exist', () => {
      const result = service.update(999, { title: 'x' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deletes existing post', () => {
      const created = service.create({ title: 't', content: 'c' });

      const result = service.delete(created.id);

      expect(result).toBe(true);
      expect(service.findOne(created.id)).toBeNull();
    });

    it('returns false if post does not exist', () => {
      const result = service.delete(999);
      expect(result).toBe(false);
    });
  });
});
