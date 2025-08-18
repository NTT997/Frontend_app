import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '@/screens/Main/Orders/OrdersScreen';
import NewOrderScreen from '@/screens/Main/Orders/New Order/NewOrderScreen';
import HistoryScreen from '@/screens/Main/Orders/OrderHistoryScreen/OrderHistoryScreen';
import PendingScreen from '@/screens/Main/Orders/PendingOrder/PendingOrderScreen';
import SelectCustomerScreen from '@/screens/Main/Orders/New Order/SelectCustomer/SelectCustomerScreen';
import SelectProductScreen from '@/screens/Main/Orders/New Order/SelectProduct/SelectProductScreen';

export type OrdersStackParamList = {
    OrdersMain: undefined;
    NewOrder: undefined;
    History: undefined;
    Pending: undefined;
    SelectCustomer: undefined;
    SelectProduct: undefined;
};

const Stack = createNativeStackNavigator<OrdersStackParamList>();

const OrdersStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // ✅ turn off default header for ALL screens
            }}
        >
            <Stack.Screen name="OrdersMain" component={OrdersScreen} />
            <Stack.Screen name="NewOrder" component={NewOrderScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Pending" component={PendingScreen} />
            <Stack.Screen name="SelectCustomer" component={SelectCustomerScreen} />
            <Stack.Screen name="SelectProduct" component={SelectProductScreen} />
        </Stack.Navigator>
    );
};

export default OrdersStack;
