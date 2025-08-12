import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OrdersStackParamList } from '@/navigations/OrderStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

type NavProps = NativeStackNavigationProp<OrdersStackParamList, 'NewOrder'>;

type SelectedProduct = {
  sku: string;
  quantity: number;
};

const NewOrderScreen = () => {
  const navigation = useNavigation<NavProps>();

  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; name: string } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);


  const handleSelectCustomer = () => {
    navigation.navigate('SelectCustomer', {
      onSelect: (customer: { id: number; name: string }) => {
        setSelectedCustomer(customer);
      }
    } as any);
  };

  const handleSelectProduct = () => {
    navigation.navigate('SelectProduct', {
      onSelect: (products: SelectedProduct[]) => {
        setSelectedProducts(products);
      }
    } as any);
  };

  return (
    <ChildLayout title="New Order">
      <View style={styles.container}>
        {/* Customer Selection */}
        <TouchableOpacity style={styles.card} onPress={handleSelectCustomer}>
          <Feather name="user" size={28} color="#0A3D91" />
          <Text style={styles.cardTitle}>
            {selectedCustomer ? selectedCustomer.name : 'Choose Customer'}
          </Text>
          <Feather name="chevron-right" size={22} color="gray" />
        </TouchableOpacity>

        {/* Product Selection */}
        <TouchableOpacity style={styles.card} onPress={handleSelectProduct}>
          <Feather name="shopping-cart" size={28} color="#0A3D91" />
          <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
            {selectedProducts.length === 0 ? (
              <Text style={styles.cardTitle}>Choose Products</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedProducts.map((p) => (
                  <View key={p.sku} style={styles.selectedProductBadge}>
                    <Text style={styles.selectedProductText}>
                      {p.sku} × {p.quantity}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
          <Feather name="chevron-right" size={22} color="gray" />
        </TouchableOpacity>
      </View>
    </ChildLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-between',
  },
  cardTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedProductBadge: {
    backgroundColor: '#0A3D91',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedProductText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default NewOrderScreen;
