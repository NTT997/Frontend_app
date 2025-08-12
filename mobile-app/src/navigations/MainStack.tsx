import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Main/Dashboard';
import { Feather } from '@expo/vector-icons';
// import OrdersScreen from '../screens/Main/OrdersScreen';

export type MainStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide default header (using custom Header component)
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'] = 'circle';

          if (route.name === 'Dashboard') {
            iconName = 'home';
          }
          // else if (route.name === 'Orders') {
          //   iconName = 'clipboard';
          // }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0A3D91',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Tab.Screen name="Orders" component={OrdersScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainStack;
