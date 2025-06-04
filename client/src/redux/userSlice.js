import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 异步登录 thunk
export const signInUser = createAsyncThunk(
  'user/signInUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // 确保至少显示1秒的加载状态
      const startTime = Date.now();
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      // 确保至少1秒的加载时间
      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  error: null,
  loading: false,
  submitStatus: '', // '', 'success', 'error'
  submitMessage: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
      state.submitStatus = ''
      state.submitMessage = ''
    },
    signInSuccess: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
      state.submitStatus = 'success'
      state.submitMessage = 'Welcome back! Login successful!'
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.submitStatus = 'error'
      state.submitMessage = action.payload
      state.user = null
    },
    clearError: (state) => {
      state.error = null
      state.submitStatus = ''
      state.submitMessage = ''
    },
    clearSubmitStatus: (state) => {
      state.submitStatus = ''
      state.submitMessage = ''
    },
    signOut: (state) => {
      state.user = null
      state.error = null
      state.loading = false
      state.submitStatus = ''
      state.submitMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitStatus = '';
        state.submitMessage = '';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.submitStatus = 'success';
        state.submitMessage = 'Welcome back! Login successful!';
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submitStatus = 'error';
        state.submitMessage = action.payload;
        state.user = null;
      });
  },
})

export const { 
  signInStart, 
  signInSuccess, 
  signInFailure, 
  clearError, 
  clearSubmitStatus,
  signOut 
} = userSlice.actions

// Selector functions
export const selectUser = (state) => state.user.user
export const selectIsAuthenticated = (state) => !!state.user.user
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const selectSubmitStatus = (state) => state.user.submitStatus

export default userSlice.reducer