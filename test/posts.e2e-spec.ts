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

  it('deletes an existing post', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'To delete', content: 'Soon' })
      .expect(201);
    const id = createRes.body.id;

    await request(app.getHttpServer())
      .delete(`/posts/${id}`)
      .expect(204);
  });

  it('returns 404 when deleting missing post', async () => {
    await request(app.getHttpServer())
      .delete('/posts/9999')
      .expect(404);
  });

  it('gets an existing post by id', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'Get me', content: 'Please' })
      .expect(201);
    const id = createRes.body.id;

    const getRes = await request(app.getHttpServer())
      .get(`/posts/${id}`)
      .expect(200);

    expect(getRes.body.id).toBe(id);
    expect(getRes.body.title).toBe('Get me');
    expect(getRes.body.content).toBe('Please');
  });

  it('returns 404 when getting missing post', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts/999999')
      .expect(404);

    expect(res.body).toHaveProperty('error');
    expect(res.body).toHaveProperty('code');
  });

  it('returns 400 on invalid id when getting post', async () => {
    await request(app.getHttpServer())
      .get('/posts/abc')
      .expect(400);
  });
});
