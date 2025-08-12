import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserProfile } from '@/redux/userSlice';
import { setLocalData } from '@/utils/helper';
import { setHasShownGreeting } from '@/redux/authSlice';

export function useDashboardViewModel() {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const { profile } = useSelector((state: RootState) => state.userprofile);
    const hasShownGreeting = useSelector((state: RootState) => state.auth.hasShownGreeting);

    const [modalVisible, setModalVisible] = useState(false);

    // Fetch user profile when userId changes
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId));
        }
    }, [userId, dispatch]);

    // Save profile and control greeting popup
    useEffect(() => {
        if (profile) {
            // Save profile to AsyncStorage
            setLocalData('user_profile', JSON.stringify(profile));

            if (!hasShownGreeting) {
                setModalVisible(true);
                dispatch(setHasShownGreeting(true));
            }
        }
    }, [profile, hasShownGreeting, dispatch]);

    const closeModal = () => setModalVisible(false);

    return {
        profile,
        modalVisible,
        closeModal,
    };
}
