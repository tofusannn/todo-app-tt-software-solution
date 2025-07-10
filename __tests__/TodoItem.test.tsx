import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../components/todos';
import { Todo } from '../features/todos';
import { describe, test, expect, vi, beforeEach } from 'vitest';

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockHandlers = {
  onToggle: vi.fn(),
  onUpdate: vi.fn(),
  onDelete: vi.fn(),
};

describe('TodoItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders todo item with title', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('shows checkbox for todo completion', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const checkbox = screen.getByRole('button', { name: /mark as complete/i });
    expect(checkbox).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const checkbox = screen.getByRole('button', { name: /mark as complete/i });
    fireEvent.click(checkbox);
    expect(mockHandlers.onToggle).toHaveBeenCalledWith('1', true);
  });

  test('shows completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    const title = screen.getByText('Test Todo');
    expect(title).toHaveClass('line-through');
  });

  test('enters edit mode on double click', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const title = screen.getByText('Test Todo');
    fireEvent.doubleClick(title);
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  test('enters edit mode when edit button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const editButton = screen.getByRole('button', { name: /edit todo/i });
    fireEvent.click(editButton);
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    fireEvent.click(deleteButton);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });

  test('shows edit and delete buttons', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    expect(screen.getByRole('button', { name: /edit todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete todo/i })).toBeInTheDocument();
  });
}); 