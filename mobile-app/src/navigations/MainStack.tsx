import React from 'react';
import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Main/Dashboard/Dashboard';
import { Feather } from '@expo/vector-icons';
import OrdersStack from './OrderStack';
import { Alert } from 'react-native';

export type MainStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Inventory: undefined;
  Report: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

// Helper to show alert and prevent navigation
const devTabListener = (screenName: string) => ({
  tabPress: (e: any) => {
    e.preventDefault(); // prevent navigation
    Alert.alert('Coming Soon', `${screenName} screen is under development.`, [
      { text: 'OK' },
    ]);
  },
});

const MainStack = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide default header (using custom Header component)
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'] = 'circle';

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Orders':
              iconName = 'clipboard';
              break;
            case 'Inventory':
              iconName = 'box'; 
              break;
            case 'Report':
              iconName = 'bar-chart-2'; 
              break;
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0A3D91',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Orders" component={OrdersStack} options={{ headerShown: false }} />
      {/* In-development tabs: render DevScreen modal */}
      <Tab.Screen
        name="Inventory"
        component={DashboardScreen} // we still need a component, but user won’t see it
        listeners={devTabListener('Inventory')}
      />
      <Tab.Screen
        name="Report"
        component={DashboardScreen}
        listeners={devTabListener('Report')}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
