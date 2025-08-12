import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Main/Dashboard/Dashboard';
import { Feather } from '@expo/vector-icons';
import OrdersScreen from '../screens/Main/Orders/OrdersScreen';
import InventoryScreen from '../screens/Main/Inventory/Inventory';
import ReportScreen from '../screens/Main/Report/Report';

export type MainStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Inventory: undefined;
  Report: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide default header (using custom Header component)
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'] = 'circle';

          // if (route.name === 'Dashboard') {
          //   iconName = 'home';
          // }
          // else if (route.name === 'Orders') {
          //   iconName = 'clipboard';
          // }

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Orders':
              iconName = 'clipboard';
              break;
            case 'Inventory':
              iconName = 'box'; // Feather icon for inventory (box)
              break;
            case 'Report':
              iconName = 'bar-chart-2'; // Feather icon for reports
              break;
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0A3D91',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 0,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />      
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
