import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoUIState {
  selectedTodoId: string | null;
  isFormOpen: boolean;
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
}

const initialState: TodoUIState = {
  selectedTodoId: null,
  isFormOpen: false,
  filter: 'all',
  searchTerm: '',
};

export const todoSlice = createSlice({
  name: 'todoUI',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<string | null>) => {
      state.selectedTodoId = action.payload;
    },
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSelectedTodo, toggleForm, setFilter, setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer; 