import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Header from '@/components/layout/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ReadableUser } from '@ui/shared-models';
import { AuthService } from '@/api/auth.service';

const DashboardScreen = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [popupShown, setPopupShown] = useState(false);
  const [user, setUser] = useState<ReadableUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const authService = new AuthService();
        const profile = await authService.findById(userId);
        setUser(profile);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (user && !popupShown) {
      Alert.alert(
        'Congratulations',
        `You are logged in dear ${user.firstName || 'User'}`,
        [{ text: 'OK', onPress: () => setPopupShown(true) }],
        { cancelable: false }
      );
    }
  }, [user, popupShown]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>Dashboard</Text>
      </View>
    </View>
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
