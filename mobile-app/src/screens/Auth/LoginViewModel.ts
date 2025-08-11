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

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      Alert.alert('Login Successful', `Welcome User ID: ${userId}`);
      // Optionally navigate here or handle post-login logic
    }
  }, [isLoggedIn, userId]);

  const handleLogin = () => {
    if (loading) return;
    Keyboard.dismiss();
    dispatch(loginAsync(userLogin));
  };

  return {
    userLogin,
    setUserLogin,
    loading,
    handleLogin,
  };
}
