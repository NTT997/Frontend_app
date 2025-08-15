import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import MainLayout from '@/components/layout/MainLayout';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit'; // optional chart library
import { Dimensions } from 'react-native';
import { useDashboardViewModel } from './DashboardViewModel';
import { Modal } from 'react-native';
import styles from './Dashboard.style'

const screenWidth = Dimensions.get('window').width;

export type OverviewData = {
  month: string;
  value: number;
};

export type RecentOrder = {
  id: string;
  productName: string;
  customerName: string;
  paymentMethod: string;
  orderNumber: string;
  date: string;
  price: number;
  avatar: string;
};

const ICONS = [
  { label: 'Analytics', icon: 'bar-chart-2', color: '#6C63FF', route: 'AnalyticsScreen' },
  { label: 'Customers', icon: 'home', color: '#FF8C42', route: 'CustomersScreen' },
  { label: 'Orders', icon: 'file-text', color: '#D57AF0', route: 'OrdersScreen' },
  { label: 'Tasks', icon: 'check-square', color: '#4CAF50', route: 'TasksScreen' },
  { label: 'Sales', icon: 'bell', color: '#FFD700', route: 'SalesScreen' },
];

const OVERVIEW: OverviewData[] = [
  { month: 'Jan', value: 30667 },
  { month: 'Feb', value: 27000 },
  { month: 'Mar', value: 29000 },
  { month: 'Apr', value: 28700 },
  { month: 'May', value: 32500 },
  { month: 'Jun', value: 27200 },
  { month: 'Jul', value: 32000 },
];

const TOTAL_REVENUE = 32575;
const TOTAL_PROFIT = 20590;
const TOTAL_VIEWS = 17100;

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { profile, modalVisible, closeModal } = useDashboardViewModel();
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    // Placeholder for API call
    setRecentOrders([
      {
        id: '1',
        productName: 'Daniel Wellington Classic',
        customerName: 'John Doe',
        paymentMethod: 'Stripe',
        orderNumber: '#51202325',
        date: 'Aug 11',
        price: 149.21,
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        productName: 'Skater Dress',
        customerName: 'Adele Camp',
        paymentMethod: 'Square',
        orderNumber: '#51202326',
        date: 'Aug 11',
        price: 149.21,
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: '3',
        productName: 'Daniel Wellington Classic',
        customerName: 'John Doe',
        paymentMethod: 'Stripe',
        orderNumber: '#51202327',
        date: 'Aug 11',
        price: 149.21,
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      {
        id: '4',
        productName: 'Skater Dress',
        customerName: 'Adele Camp',
        paymentMethod: 'Square',
        orderNumber: '#51202328',
        date: 'Aug 11',
        price: 149.21,
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
    ]);
  };

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        {/* Top Icons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconScroll}>
          {ICONS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.iconItem, { borderColor: item.color }]}
              onPress={() => navigation.navigate(item.route as never)}
            >
              <Feather name={item.icon as any} size={24} color={item.color} />
              <Text style={styles.iconLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <LineChart
          data={{
            labels: OVERVIEW.map((d) => d.month),
            datasets: [{ data: OVERVIEW.map((d) => d.value) }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => '#0A3D91',
            strokeWidth: 2,
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.totals}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>TOTAL REVENUE</Text>
            <Text style={styles.totalValue}>${TOTAL_REVENUE.toLocaleString()}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>TOTAL PROFIT</Text>
            <Text style={styles.totalValue}>${TOTAL_PROFIT.toLocaleString()}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>TOTAL VIEWS</Text>
            <Text style={styles.totalValue}>{TOTAL_VIEWS.toLocaleString()}</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {recentOrders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <Image source={{ uri: order.avatar }} style={styles.avatar} />
            <View style={styles.orderInfo}>
              <Text style={styles.productName}>{order.productName}</Text>
              <Text style={styles.customerInfo}>
                {order.customerName} · {order.paymentMethod} · {order.orderNumber} · {order.date}
              </Text>
            </View>
            <Text style={[styles.price, { color: order.paymentMethod === 'Stripe' ? 'red' : 'blue' }]}>
              ${order.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Hello, {profile?.email}!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </MainLayout>
  );
};

export default DashboardScreen;

