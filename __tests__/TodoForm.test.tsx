import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../components/todos/TodoForm';
import { describe, it, expect, vi } from 'vitest';

describe('TodoForm', () => {
  it('renders input and buttons', () => {
    render(
      <TodoForm onSubmit={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('calls onSubmit with title and date', () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm onSubmit={onSubmit} onCancel={() => {}} />
    );
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText(/submit/i));
    expect(onSubmit).toHaveBeenCalled();
  });
}); 