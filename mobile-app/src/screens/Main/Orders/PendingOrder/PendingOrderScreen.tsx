import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ChildLayout from '@/components/layout/ChildLayout';
import { OrderRequestService } from '@/api/orderRequest.service';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '@/redux/authSlice';

const PendingScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch]);

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const service = new OrderRequestService();

      const data = await service.fetchListOrderRequestByEmail({
        email: profile?.emailAddress,
        status: 'PENDING',
      });
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch pending orders', error);
      Alert.alert('Error', 'Failed to load pending orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderCode}>Order: {item.code}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log('View order', item.id)}
          >
            <Feather name="eye" size={20} color="#0A3D91" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log('Details order', item.id)}
          >
            <Feather name="info" size={20} color="#0A3D91" />
          </TouchableOpacity>
        </View>
      </View>
      <Text>Customer: {item.customer?.name ?? 'Unknown'}</Text>
      <Text>Total: ${item.total?.toLocaleString() ?? 0}</Text>
    </View>
  );

  return (
    <ChildLayout title="Pending Orders">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0A3D91" />
        ) : orders.length === 0 || orders == null ? (
          <Text style={styles.emptyText}>No pending orders found.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orders?.toString() ?? item.code ?? Math.random().toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ChildLayout>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
  orderCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderCode: { fontWeight: 'bold' },
  iconRow: { flexDirection: 'row', gap: 12 },
  iconButton: { padding: 4 },
});
