import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};
// @Note: For me
// {
//   id: uuidv4(),
//   title: data.title,
//   description: data.description,
//   coverImage: data.coverImage || '',
//   columnOrder:[]  
// }

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjectAction: (state, action) => {
      state.list.push(action.payload);
    },
    reorderColumns: (state, action) => {
      const { projectId, columnOrder } = action.payload;
      const project = state.list.find(p => p.id === projectId);
      if (project) {
        project.columnOrder = columnOrder;
      }
    },

  },
});

export const { addProjectAction, reorderColumns } = projectsSlice.actions;
export default projectsSlice.reducer;
