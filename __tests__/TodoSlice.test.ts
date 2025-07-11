import reducer, { setSelectedTodo, toggleForm, setSearchTerm } from '../features/todos/TodoSlice';
import { describe, it, expect } from 'vitest';

describe('todoSlice reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      selectedTodoId: null,
      isFormOpen: false,
      searchTerm: '',
    });
  });

  it('should handle setSelectedTodo', () => {
    const state = reducer(undefined, setSelectedTodo('123'));
    expect(state.selectedTodoId).toBe('123');
  });

  it('should handle toggleForm', () => {
    const state = reducer(undefined, toggleForm());
    expect(state.isFormOpen).toBe(true);
  });

  it('should handle setSearchTerm', () => {
    const state = reducer(undefined, setSearchTerm('abc'));
    expect(state.searchTerm).toBe('abc');
  });
}); 