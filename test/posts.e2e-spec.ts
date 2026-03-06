import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Posts (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a post', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Hello', content: 'World' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Hello');
    expect(response.body.content).toBe('World');
  });

  it('updates an existing post', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Old', content: 'Content' })
      .expect(201);
    const id = createRes.body.id;

    const updateRes = await request(app.getHttpServer())
      .put(`/posts/${id}`)
      .send({ title: 'New' })
      .expect(200);

    expect(updateRes.body.title).toBe('New');
    expect(updateRes.body.content).toBe('Content');
  });

  it('returns 404 when updating missing post', async () => {
    await request(app.getHttpServer())
      .put('/posts/9999')
      .send({ title: 'X' })
      .expect(404);
  });

  it('returns 400 on validation error', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Valid', content: 'Valid' })
      .expect(201);
    const id = createRes.body.id;

    await request(app.getHttpServer())
      .put(`/posts/${id}`)
      .send({ title: '' })
      .expect(400);
  });

  it('returns empty list initially', async () => {
    const res = await request(app.getHttpServer()).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns list with created post', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'List', content: 'Item' })
      .expect(201);

    const res = await request(app.getHttpServer()).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
