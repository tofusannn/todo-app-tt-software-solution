'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFilter, setSearchTerm, toggleForm } from '../features/todos/TodoSlice';
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../features/todos/TodoAPI';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { TodoFilters } from './TodoFilters';
import { DarkModeToggle } from './DarkModeToggle';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { ErrorBanner } from './UI/ErrorBanner';

export function TodoApp() {
  const dispatch = useDispatch();
  const { filter, searchTerm, isFormOpen } = useSelector((state: RootState) => state.todoUI);
  
  const { data: todos = [], isLoading, error } = useGetTodosQuery();
  const [createTodo, { isLoading: isCreating, error: createError }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating, error: updateError }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, error: deleteError }] = useDeleteTodoMutation();

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate counts
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleCreateTodo = async (title: string) => {
    try {
      await createTodo({ title }).unwrap();
      dispatch(toggleForm());
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      await updateTodo({ id, completed }).unwrap();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    try {
      await updateTodo({ id, title }).unwrap();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({ id }).unwrap();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // Show error banner for any mutation error
  const mutationError = createError || updateError || deleteError;

  if (error) {
    return <ErrorBanner message="Failed to load todos. Please try again." />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Todo App
        </h1>
        <DarkModeToggle />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
        {(isCreating || isUpdating || isDeleting) && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-lg">
            <LoadingSpinner />
          </div>
        )}
        {mutationError && (
          <ErrorBanner message="An error occurred while saving. Please try again." />
        )}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => dispatch(toggleForm())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Todo
          </button>
        </div>

        {isFormOpen && (
          <TodoForm
            onSubmit={handleCreateTodo}
            onCancel={() => dispatch(toggleForm())}
            placeholder="What needs to be done?"
          />
        )}

        <TodoFilters
          filter={filter}
          searchTerm={searchTerm}
          onFilterChange={(filter: 'all' | 'active' | 'completed') => dispatch(setFilter(filter))}
          onSearchChange={(term: string) => dispatch(setSearchTerm(term))}
          todoCount={filteredTodos.length}
          totalCount={todos.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchTerm || filter !== 'all' ? 'No todos match your filters.' : 'No todos yet. Add one to get started!'}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 