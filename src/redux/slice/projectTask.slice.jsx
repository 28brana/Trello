import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectTasks: {}, // { [projectId]: [ [task1], [task2, task3], [] ] }
};

const projectTasksSlice = createSlice({
  name: 'projectTasks',
  initialState,
  reducers: {
    initializeProject: (state, action) => {
      const { projectId } = action.payload;
      if (!state.projectTasks[projectId]) {
        state.projectTasks[projectId] = [[], [], []];
      }
    },
    addList: (state, action) => {
      const { projectId } = action.payload;
      state.projectTasks[projectId].push([]);
    },
    addTask: (state, action) => {
      const { projectId, listIndex, task } = action.payload;
      state.projectTasks[projectId][listIndex].push(task);
    },
    moveTask: (state, action) => {
      const { projectId, source, destination } = action.payload;
      const taskList = state.projectTasks[projectId];
      const [movedTask] = taskList[source.droppableId].splice(source.index, 1);
      taskList[destination.droppableId].splice(destination.index, 0, movedTask);
    },
  },
});

export const { initializeProject, addList, addTask, moveTask } = projectTasksSlice.actions;
export default projectTasksSlice.reducer;

