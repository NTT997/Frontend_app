import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userprofile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
