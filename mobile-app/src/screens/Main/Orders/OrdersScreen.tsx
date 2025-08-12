import React, { Children, JSX, use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MainLayout from '@/components/layout/MainLayout';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OrdersStackParamList } from '@/navigations/OrderStack';
import ChildLayout from '@/components/layout/ChildLayout';

const DashboardScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

  type MenuItem = {
    label: string;
    icon: JSX.Element;
    route: keyof OrdersStackParamList;
  };

  const menuItems: MenuItem[] = [
    { label: 'New Order', icon: <Feather name="shopping-cart" size={28} color="#FF9800" />, route: 'NewOrder' },
    { label: 'History', icon: <Feather name="clock" size={28} color="#4F8EF7" />, route: 'History' },
    { label: 'Pending', icon: <MaterialIcons name="hourglass-empty" size={28} color="#FFC107" />, route: 'Pending' },
  ];

  return (
    <MainLayout>
      <View style={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}
          >
            {item.icon}
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </MainLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    width: '48%',
    aspectRatio: 1, // Makes square cards
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
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
