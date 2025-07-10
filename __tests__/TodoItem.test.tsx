import { describe, it, expect } from 'vitest';
import { render, screen } from '../src/test/test-utils';

// Mock component for testing
const TodoItem = ({ todo }: { todo: { id: string; title: string; completed: boolean } }) => (
  <div data-testid={`todo-${todo.id}`}>
    <span>{todo.title}</span>
    <input type="checkbox" checked={todo.completed} readOnly />
  </div>
);

describe('TodoItem', () => {
  it('renders todo title', () => {
    const todo = { id: '1', title: 'Test Todo', completed: false };
    render(<TodoItem todo={todo} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('shows completed state', () => {
    const todo = { id: '1', title: 'Test Todo', completed: true };
    render(<TodoItem todo={todo} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
}); 