import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, CreateTodoRequest, UpdateTodoRequest, DeleteTodoRequest } from './types';

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: isTest ? 'http://localhost/api/todos' : '/api/todos' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '',
      providesTags: ['Todo'],
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
      query: (patch) => ({
        url: '',
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, DeleteTodoRequest>({
      query: (body) => ({
        url: '',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi; 