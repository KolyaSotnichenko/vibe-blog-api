import { randomUUID } from 'crypto';
import { Todo, TodoStatus } from './todo.entity';
import { fileStore } from '../db/sqlite';

interface TodoStore {
  todos: Todo[];
}

function load(): TodoStore {
  const data = fileStore.load() as unknown as TodoStore;
  return { todos: data.todos ?? [] };
}

function save(store: TodoStore): void {
  fileStore.save(store as unknown as { todos: Todo[] });
}

export class TodosService {
  findAll(): Todo[] {
    return load().todos;
  }

  findOne(id: string): Todo | undefined {
    return load().todos.find(t => t.id === id);
  }

  create(title: string, description?: string): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: randomUUID(),
      title,
      description: description ?? null,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    const store = load();
    store.todos.push(todo);
    save(store);
    return todo;
  }

  update(id: string, data: Partial<{ title: string; description: string; status: TodoStatus }>): Todo | undefined {
    const store = load();
    const todo = store.todos.find(t => t.id === id);
    if (!todo) return undefined;
    if (data.title !== undefined) todo.title = data.title;
    if (data.description !== undefined) todo.description = data.description;
    if (data.status !== undefined) todo.status = data.status;
    todo.updatedAt = new Date().toISOString();
    save(store);
    return todo;
  }

  remove(id: string): boolean {
    const store = load();
    const idx = store.todos.findIndex(t => t.id === id);
    if (idx === -1) return false;
    store.todos.splice(idx, 1);
    save(store);
    return true;
  }
}
