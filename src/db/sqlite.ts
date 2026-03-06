// eslint-disable-next-line @typescript-eslint/no-var-requires
const Database = require('better-sqlite3');

export const db = new Database('data.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);
`);
import { DataSource } from 'typeorm';
import { Post } from '../posts/post.entity';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Post],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});
