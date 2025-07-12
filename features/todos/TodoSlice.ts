import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoUIState {
  selectedTodoId: string | null;
  isFormOpen: boolean;
  searchTerm: string;
}

const initialState: TodoUIState = {
  selectedTodoId: null,
  isFormOpen: false,
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
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSelectedTodo, toggleForm, setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer; 