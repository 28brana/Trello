import { combineReducers } from 'redux';
import authSlice from './slice/auth.slice';
import projectSlice from './slice/project.slice';
import columnSlice from './slice/column.slice';
import taskSlice from './slice/task.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectSlice,
  columns: columnSlice,
  tasks: taskSlice,
});

export default rootReducer;
