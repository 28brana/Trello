import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjectAction: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addProjectAction } = projectsSlice.actions;
export default projectsSlice.reducer;
