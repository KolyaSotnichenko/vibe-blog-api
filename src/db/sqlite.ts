import Database from 'better-sqlite3';

export const db: Database.Database = new Database('data.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);
`);
