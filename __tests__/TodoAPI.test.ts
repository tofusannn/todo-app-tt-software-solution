import { todoApi } from '../features/todos/TodoAPI';
import { describe, it, expect } from 'vitest';

describe('todoApi', () => {
  it('should have endpoints', () => {
    expect(todoApi.endpoints).toHaveProperty('getTodos');
    expect(todoApi.endpoints).toHaveProperty('createTodo');
    expect(todoApi.endpoints).toHaveProperty('updateTodo');
    expect(todoApi.endpoints).toHaveProperty('deleteTodo');
  });
}); 