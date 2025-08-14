import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserProfileFromToken, minimumProfile } from '@/utils/jwthelper';
import { setLocalData } from '@/utils/helper';
import Constant from '@/utils/constant';

// Async thunk to fetch user profile by ID
export const fetchUserProfile = createAsyncThunk<
    minimumProfile,
    number,
    { rejectValue: string }>(
        'userProfile/fetchById',
        async (userId, { rejectWithValue }) => {
            try {
                const profile = await getUserProfileFromToken();

                if (!profile) {
                    return rejectWithValue('User profile not found');
                }

                await setLocalData(Constant.USER_PROFILE, JSON.stringify(profile));

                return profile;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Failed to fetch user profile');
            }
        }
    );

interface UserProfileState {
    profile: minimumProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    profile: null,
    loading: false,
    error: null,
};

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        clearUserProfile(state) {
            state.profile = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUserProfile.fulfilled,
                (state, action: PayloadAction<minimumProfile>) => {
                    state.loading = false;
                    state.profile = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to load user profile';
                state.profile = null;
            });
    },
});

export const { clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
