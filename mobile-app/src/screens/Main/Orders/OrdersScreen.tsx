import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Header from '@/components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserProfile } from '@/redux/userSlice';
import { setHasShownGreeting } from '@/redux/authSlice';
import MainLayout from '@/components/layout/MainLayout';

const DashboardScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { profile, loading, error } = useSelector((state: RootState) => state.userprofile);
  const hasShownGreeting = useSelector((state: RootState) => state.auth.hasShownGreeting);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserProfile(userId));
  //   }
  // }, [userId, dispatch]);

  useEffect(() => {
    if (userId && !profile) {
      dispatch(fetchUserProfile(userId));
    }

    if (profile && !hasShownGreeting) {
      Alert.alert('Welcome', `Hello, ${profile.emailAddress}!`, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(setHasShownGreeting(true));
          },
        },
      ]);
    }
  }, [profile, hasShownGreeting, dispatch]);

  return (
    <MainLayout>
      <View style={styles.content}>
        <Text>Order</Text>
      </View>
    </MainLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
