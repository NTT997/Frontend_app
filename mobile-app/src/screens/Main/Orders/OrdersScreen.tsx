import React, { JSX, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MainLayout from '@/components/layout/MainLayout';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OrdersStackParamList } from '@/navigations/OrderStack';

const icons = {
  newOrder: <Feather name="shopping-cart" size={28} color="#FF9800" />,
  history: <Feather name="clock" size={28} color="#4F8EF7" />,
  pending: <MaterialIcons name="hourglass-empty" size={28} color="#FFC107" />,
};

type MenuItem = {
  label: string;
  icon: JSX.Element;
  route: keyof OrdersStackParamList;
};

const menuItems: MenuItem[] = [
  { label: 'New Order', icon: icons.newOrder, route: 'NewOrder' },
  { label: 'History', icon: icons.history, route: 'History' },
  { label: 'Pending', icon: icons.pending, route: 'Pending' },
];

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

  const handleNavigate = useCallback(
    (route: keyof OrdersStackParamList) => {
      navigation.navigate(route);
    },
    [navigation]
  );

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.card}
            onPress={() => handleNavigate(item.route)}
          >
            {item.icon}
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MainLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    rowGap: 20,
    columnGap: 20,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
