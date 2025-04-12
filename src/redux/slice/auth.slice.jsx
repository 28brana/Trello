import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerAction(state, action) {
      const { username, email, password } = action.payload;
      const hashedPassword = CryptoJS.SHA256(password).toString();

      state.user = { username, email, password: hashedPassword };
      state.isLogin = true;
    },

    loginAction(state, action) {
      const { email, password } = action.payload;
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Check against persisted user
      if (
        state.user &&
        state.user.email === email &&
        state.user.password === hashedPassword
      ) {
        state.isLogin = true;
        window.location.href='/'
        toast(`Welcome ${email}`)
      } else {
        toast('Invalid credentials');
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
