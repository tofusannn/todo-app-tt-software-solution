import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { TodoApp } from '../components/todos/TodoApp';

const mockStore = configureStore([]);
const store = mockStore({
  todoUI: { filter: 'all', searchTerm: '', isFormOpen: false },
});

vi.mock('../features/todos', () => ({
  useGetTodosQuery: () => ({ data: [], isLoading: false, error: null }),
  useCreateTodoMutation: () => [vi.fn(), { isLoading: false, error: null }],
  useUpdateTodoMutation: () => [vi.fn(), { isLoading: false, error: null }],
  useDeleteTodoMutation: () => [vi.fn(), { isLoading: false, error: null }],
  setSearchTerm: vi.fn(),
  toggleForm: vi.fn(),
}));

describe('TodoApp', () => {
  it('renders Today and uncompleted tasks', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getAllByText(/uncompleted tasks/i).length).toBeGreaterThan(0);
  });
}); 