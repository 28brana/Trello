import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // { id, columnId, title, description }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    moveTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      const task = state.list.find((t) => t.id === taskId);
      if (task) task.columnId = columnId;
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.list.find((t) => t.id === id);
      if (task) Object.assign(task, updates);
    },
  },
});

export const { addTask, moveTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
