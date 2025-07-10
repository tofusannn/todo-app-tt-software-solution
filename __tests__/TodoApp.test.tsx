import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from '../features/todos';
import { todoSlice } from '../features/todos';
import { TodoApp } from '../components/todos';
import { describe, test, expect } from 'vitest';

// Mock the API
const mockStore = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todoUI: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('TodoApp', () => {
  test('renders todo app with title', () => {
    renderWithProvider(<TodoApp />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  test('shows add todo button', () => {
    renderWithProvider(<TodoApp />);
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('opens todo form when add button is clicked', () => {
    renderWithProvider(<TodoApp />);
    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  test('shows filter buttons', () => {
    renderWithProvider(<TodoApp />);
    expect(screen.getByText(/All \(\d+\)/)).toBeInTheDocument();
    expect(screen.getByText(/Active \(\d+\)/)).toBeInTheDocument();
    expect(screen.getByText(/Completed \(\d+\)/)).toBeInTheDocument();
  });

  test('shows search input', () => {
    renderWithProvider(<TodoApp />);
    expect(screen.getByPlaceholderText('Search todos...')).toBeInTheDocument();
  });

  test('shows dark mode toggle', () => {
    renderWithProvider(<TodoApp />);
    const darkModeButton = screen.getByLabelText('Toggle dark mode');
    expect(darkModeButton).toBeInTheDocument();
  });
}); 