import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  projectTasks: {} // projectId: [[task1, task2], [task3], ...]
};

const projectTaskSlice = createSlice({
  name: 'projectTasks',
  initialState,
  reducers: {
    initializeProject: (state, action) => {
      const { projectId } = action.payload;
      if (!state.projectTasks[projectId]) {
        state.projectTasks[projectId] = [[]];
      }
    },
    addList: (state, action) => {
      const { projectId } = action.payload;
      state.projectTasks[projectId].push([]);
    },
    addTask: (state, action) => {
      const { projectId, listIndex, task } = action.payload;
      state.projectTasks[projectId][listIndex].push({ ...task, id: uuidv4() });
    },
    moveTask: (state, action) => {
      const { projectId, activeId, overId } = action.payload;
      const lists = state.projectTasks[projectId];

      let fromListIndex, fromTaskIndex, taskToMove;
      let toListIndex, toTaskIndex;

      lists.forEach((list, listIndex) => {
        list.forEach((task, taskIndex) => {
          if (task.id === activeId) {
            fromListIndex = listIndex;
            fromTaskIndex = taskIndex;
            taskToMove = task;
          }
          if (task.id === overId) {
            toListIndex = listIndex;
            toTaskIndex = taskIndex;
          }
        });
      });

      if (taskToMove && typeof toListIndex !== 'undefined') {
        lists[fromListIndex].splice(fromTaskIndex, 1);
        lists[toListIndex].splice(toTaskIndex, 0, taskToMove);
      }
    },
  },
});

export const { initializeProject, addList, addTask, moveTask } = projectTaskSlice.actions;
export default projectTaskSlice.reducer;
