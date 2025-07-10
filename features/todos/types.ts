export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  completed?: boolean;
}

export interface DeleteTodoRequest {
  id: string;
} 