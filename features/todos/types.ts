export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  date: string;
}

export interface CreateTodoRequest {
  title: string;
  date: string;
}

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  completed?: boolean;
  date?: string;
}

export interface DeleteTodoRequest {
  id: string;
} 