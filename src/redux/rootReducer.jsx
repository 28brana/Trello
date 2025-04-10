import { combineReducers } from 'redux';
import authSlice from './slice/auth.slice';
import projectSlice from './slice/project.slice';
import projectTasksReducer from './slice/projectTask.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectSlice,
  projectTasks: projectTasksReducer,
});

export default rootReducer;
