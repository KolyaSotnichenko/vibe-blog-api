import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataFile = join(process.cwd(), 'data.json');

export interface StoredPost {
  id: number;
  title: string;
  content: string;
}

export interface Store {
  posts: StoredPost[];
}

function loadStore(): Store {
  if (!existsSync(dataFile)) {
    return { posts: [] };
  }
  const raw = readFileSync(dataFile, 'utf8');
  return JSON.parse(raw) as Store;
}

function saveStore(store: Store): void {
  writeFileSync(dataFile, JSON.stringify(store, null, 2));
}

export const fileStore = {
  load: loadStore,
  save: saveStore,
};
