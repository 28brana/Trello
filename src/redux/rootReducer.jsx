import { combineReducers } from 'redux';
import authSlice from './slice/auth.slice';
import projectSlice from './slice/project.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectSlice,
});

export default rootReducer;
