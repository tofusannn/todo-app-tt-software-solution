import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../components/todos/TodoItem';
import { describe, it, expect, vi } from 'vitest';

describe('TodoItem', () => {
  const todo = { id: '1', title: 'Test Todo', completed: false, date: '2024-06-01', createdAt: '', updatedAt: '' };
  const onToggle = vi.fn();
  const onUpdate = vi.fn();
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  it('renders todo title', () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls onToggle when toggle button is clicked', () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByLabelText(/complete/i));
    expect(onToggle).toHaveBeenCalled();
  });
}); 