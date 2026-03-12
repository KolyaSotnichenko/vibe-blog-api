export type TodoStatus = 'pending' | 'in_progress' | 'done';

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
