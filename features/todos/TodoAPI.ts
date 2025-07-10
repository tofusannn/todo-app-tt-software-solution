import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, CreateTodoRequest, UpdateTodoRequest, DeleteTodoRequest } from './types';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/todos' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '',
      providesTags: ['Todo'],
    }),
    getTodo: builder.query<Todo, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todo', id }],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (todo) => ({
        url: '',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<Todo, UpdateTodoRequest>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
    }),
    deleteTodo: builder.mutation<void, DeleteTodoRequest>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi; 