import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todoApi } from '../features/todos/TodoAPI';
import todoSlice from '../features/todos/TodoSlice';

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todoUI: todoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 