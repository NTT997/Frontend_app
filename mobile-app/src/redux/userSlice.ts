// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { ReadableUser } from '@ui/shared-models';
// import { AuthService } from '@/api/auth.service';

// // Async thunk to fetch user profile by ID
// export const fetchUserProfile = createAsyncThunk<
//     ReadableUser,
//     number,
//     { rejectValue: string }>(
//         'userProfile/fetchById',
//         async (userId, { rejectWithValue }) => {
//             try {
//                 const authService = new AuthService();
//                 const profile = await authService.findById(userId);
//                 if (!profile) {
//                     return rejectWithValue('User profile not found');
//                 }
//                 return profile;
//             } catch (error: any) {
//                 return rejectWithValue(error.message || 'Failed to fetch user profile');
//             }
//         }
//     );

// interface UserProfileState {
//     profile: ReadableUser | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: UserProfileState = {
//     profile: null,
//     loading: false,
//     error: null,
// };

// const userProfileSlice = createSlice({
//     name: 'userProfile',
//     initialState,
//     reducers: {
//         clearUserProfile(state) {
//             state.profile = null;
//             state.loading = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserProfile.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchUserProfile.fulfilled,
//                 (state, action: PayloadAction<ReadableUser>) => {
//                     state.loading = false;
//                     state.profile = action.payload;
//                     state.error = null;
//                 }
//             )
//             .addCase(fetchUserProfile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload ?? 'Failed to load user profile';
//                 state.profile = null;
//             });
//     },
// });

// export const { clearUserProfile } = userProfileSlice.actions;
// export default userProfileSlice.reducer;
