import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@/api/auth.service';
import { ReadableUser } from '@ui/shared-models';

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  token: string | null;
  error: string | null;
  userId?: number;
  hasShownGreeting?: boolean; // Optional field to track greeting state
  profile: ReadableUser | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  token: null,
  error: null,
  userId: undefined,
  hasShownGreeting: false, // Initialize greeting state
  profile: null
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

export const fetchUserProfile = createAsyncThunk<
  ReadableUser,
  number,
  { rejectValue: string }
>(
  'auth/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const authService = new AuthService();
      const profile = await authService.findById(userId);
      if (!profile) return rejectWithValue('User profile not found');
      return profile;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
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
      state.profile = null;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
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
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
        state.isLoggedIn = false;
        state.token = null;
        state.userId = undefined;
        state.profile = null;
      })

      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<ReadableUser>) => {
          state.loading = false;
          state.profile = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load user profile';
        state.profile = null;
      })

      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.userId = undefined;
        state.error = null;
        state.loading = false;
        state.profile = null;
      });
  },
});
export const { setHasShownGreeting, resetAuth, resetError, clearUserProfile } =
  authSlice.actions;
export default authSlice.reducer;
