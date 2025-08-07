// src/screens/login/LoginViewModel.ts
import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { AuthService } from '../authService/auth.service';
import { setLocalData } from '../../../utils/helper';

export function useLoginViewModel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  const handleLogin = async () => {
    if (loading) return; // prevent double clicks
    Keyboard.dismiss();
    setLoading(true);

    try {
      const response = await authService.login({ username, password });
        console.log('[LoginViewModel] Login response:', response);
      if (response && response.token) {
        await setLocalData('TOKEN_KEY', response.token);
        Alert.alert('Login Successful', `Welcome User ID: ${response.id}`);
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
