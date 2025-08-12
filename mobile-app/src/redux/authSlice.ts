import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@/api/auth.service';

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  token: string | null;
  error: string | null;
  userId?: number;
  hasShownGreeting?: boolean; // Optional field to track greeting state
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  token: null,
  error: null,
  userId: undefined,
  hasShownGreeting: false, // Initialize greeting state
};

// Async thunk for login
export const loginAsync = createAsyncThunk<
  { token: string; userId: number },
  { username: string; password: string },
  { rejectValue: string }
>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const authService = new AuthService();
      const response = await authService.login(credentials);

      if (!response || !response.token) {
        return rejectWithValue('Invalid username or password');
      }

      // AuthService already stores token & user info in AsyncStorage
      return { token: response.token, userId: response.id };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(message);
    }
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  const authService = new AuthService();
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Optional: local logout action if needed
    resetError(state) {
      state.error = null;
    },
    setHasShownGreeting(state, action: PayloadAction<boolean>) {
      state.hasShownGreeting = action.payload;
    },
    resetAuth(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = undefined;
      state.hasShownGreeting = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ token: string; userId: number }>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.userId = action.payload.userId;
          state.error = null;
        }
      )
      // Login rejected
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
        state.isLoggedIn = false;
        state.token = null;
        state.userId = undefined;
      })
      // Logout fulfilled
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.userId = undefined;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { setHasShownGreeting, resetAuth , resetError} = authSlice.actions;

export default authSlice.reducer;
