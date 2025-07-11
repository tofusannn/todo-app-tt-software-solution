import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFilters } from '../components/todos/TodoFilters';
import { describe, it, expect, vi } from 'vitest';

describe('TodoFilters', () => {
  it('renders search input and shows todo count', () => {
    render(
      <TodoFilters
        filter="all"
        searchTerm=""
        onSearchChange={() => {}}
        todoCount={2}
        totalCount={5}
      />
    );
    expect(screen.getByPlaceholderText(/search todos/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    render(
      <TodoFilters
        filter="all"
        searchTerm=""
        onSearchChange={onSearchChange}
        todoCount={2}
        totalCount={5}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/search todos/i), { target: { value: 'abc' } });
    expect(onSearchChange).toHaveBeenCalledWith('abc');
  });
}); 