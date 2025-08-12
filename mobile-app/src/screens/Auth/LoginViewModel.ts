import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Keyboard } from 'react-native';
import { loginAsync } from '@/redux/authSlice';
import type { RootState, AppDispatch } from '@/redux/store';
import { userLogin as UserLoginType } from '@ui/shared-models';

export function useLoginViewModel() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [userLogin, setUserLogin] = useState<UserLoginType>({
    username: '',
    password: '',
  });

  // Modal visibility states
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Show error modal when error changes
  useEffect(() => {
    if (error) {
      setErrorModalVisible(true);
    }
  }, [error]);

  // Show success modal when login succeeds
  useEffect(() => {
    if (isLoggedIn && userId) {
      setSuccessModalVisible(true);
    }
  }, [isLoggedIn, userId]);

  // Handle login
  const handleLogin = () => {
    if (loading) return;
    Keyboard.dismiss();
    dispatch(loginAsync(userLogin));
  };

  // Modal close handlers
  const closeErrorModal = () => setErrorModalVisible(false);
  const closeSuccessModal = () => setSuccessModalVisible(false);

  return {
    userLogin,
    setUserLogin,
    loading,
    handleLogin,
    errorModalVisible,
    closeErrorModal,
    error,
    successModalVisible,
    closeSuccessModal,
    userId,
  };
}
