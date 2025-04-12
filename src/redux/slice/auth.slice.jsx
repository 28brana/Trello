import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isLogin: false,
  userList: [], 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerAction(state, action) {
      const { username, email, password } = action.payload;

      // Check if email already exists
      const existingUser = state.userList.find((u) => u.email === email);
      if (existingUser) {
        toast.error('Email already exists');
        return;
      }

      const hashedPassword = CryptoJS.SHA256(password).toString();
      const newUser = { username, email, password: hashedPassword };

      state.user = newUser;
      state.isLogin = true;
      state.userList.push(newUser); // 🆕 Save to userList

      toast.success(`Welcome ${username}`);
      window.location.href = '/';
    },

    loginAction(state, action) {
      const { email, password } = action.payload;
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Check against all users in the list
      const matchedUser = state.userList.find(
        (u) => u.email === email && u.password === hashedPassword
      );

      if (matchedUser) {
        state.user = matchedUser;
        state.isLogin = true;
        toast.success(`Welcome ${matchedUser.username}`);
        window.location.href = '/';
      } else {
        toast.error('Invalid credentials');
      }
    },

    logoutAction(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { registerAction, loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
