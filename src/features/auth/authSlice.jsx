import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  accessToken: JSON.parse(localStorage.getItem('user'))?.access_token || null,
  isAuthenticated: !!localStorage.getItem('user'),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.accessToken = access_token;
      state.isAuthenticated = true;
      localStorage.setItem('access_token', access_token);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;