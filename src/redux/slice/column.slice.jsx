import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // { id, boardId, title, taskOrders: [] }
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumnAction: (state, action) => {
      state.list.push(action.payload);
    },
    // In your columns slice
    reorderTasks: (state, action) => {
      const { columnId, taskIds } = action.payload;
      const column = state.list.find(col => col.id === columnId);
      if (column) {
        column.taskIds = taskIds;
      }
    },
    moveTaskInColumn: (state, action) => {
      const { columnId, taskIds } = action.payload;
      const column = state.list.find((col) => col.id === columnId);
      if (column) column.taskIds = taskIds;
    },
    updateColumnTitle: (state, action) => {
      const { columnId, newTitle } = action.payload;
      const col = state.list.find((c) => c.id === columnId);
      if (col) col.title = newTitle;
    },
  },
});

export const { addColumnAction, moveTaskInColumn,reorderTasks, updateColumnTitle } =
  columnsSlice.actions;
export default columnsSlice.reducer;
