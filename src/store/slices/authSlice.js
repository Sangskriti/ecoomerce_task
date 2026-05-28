import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: localStorage.getItem('token') || null, 
    user: null,
    loading: false,
    error: null 
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; 
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;