import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AuthLayout from '@/components/layout/AuthLayout';
import { useLoginViewModel } from './LoginViewModel';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '@/redux/authSlice';
import type { RootState, AppDispatch } from '@/redux/store';

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { userLogin, setUserLogin } = useLoginViewModel();
  
  const onLoginPress = () => {
    if (authState.loading) return;
    dispatch(loginAsync(userLogin));
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        {/* Upper Section */}
        <View style={styles.upperSection}>
          <Image
            source={require('../../../assets/images/favicon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Lower Section */}
        <View style={styles.lowerSection}>
          <View style={styles.card}>
            <Text style={styles.title}>Đăng nhập</Text>

            {/* Username */}
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="SM0161"
                style={styles.input}
                placeholderTextColor="#999"
                value={userLogin.username}
                onChangeText={(username) => setUserLogin({ ...userLogin, username })}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="••••••"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}
                value={userLogin.password}
                onChangeText={(password) => setUserLogin({ ...userLogin, password })}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Feather
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#666"
                  style={styles.iconRight}
                />
              </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.loginButton, authState.loading && { opacity: 0.7 }]}
              // onPress={onLoginPress}
              onPress={onLoginPress}
              disabled={authState.loading}
            >
              {authState.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // ensures white top part
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 150, height: 80 },
  lowerSection: {
    flex: 1.5, // take enough space to reach footer
    backgroundColor: '#0A3D91',
    alignItems: 'center',
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -30,
    overflow: 'hidden',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  icon: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  input: { flex: 1, paddingVertical: 10, color: '#000' },
  loginButton: {
    backgroundColor: '#0A3D91',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});
