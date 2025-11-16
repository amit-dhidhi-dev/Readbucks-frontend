import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      // console.log("token", token)
      const response = await userApi.getCurrentUser(token);
      // console.log('fetch user', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;