import { http, HttpResponse } from 'msw';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../features/todos/types';

// Mock data
let todos: Todo[] = [
  {
    id: '1',
    title: 'Learn Next.js',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build Todo App',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const handlers = [
  // GET /api/todos - Get all todos
  http.get('/api/todos', () => {
    return HttpResponse.json(todos);
  }),

  // GET /api/todos/:id - Get single todo
  http.get('/api/todos/:id', ({ params }) => {
    const { id } = params;
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(todo);
  }),

  // POST /api/todos - Create todo
  http.post('/api/todos', async ({ request }) => {
    const body = await request.json() as CreateTodoRequest;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: body.title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PATCH /api/todos/:id - Update todo
  http.patch('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as UpdateTodoRequest;
    
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    todos[todoIndex] = updatedTodo;
    return HttpResponse.json(updatedTodo);
  }),

  // DELETE /api/todos/:id - Delete todo
  http.delete('/api/todos/:id', ({ params }) => {
    const { id } = params;
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    todos.splice(todoIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
]; 