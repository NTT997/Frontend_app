import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OrdersStackParamList } from '@/navigations/OrderStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './NewOrder.style';
import { PersistableOrder } from '@ui/shared-models';
import { orderService } from '@/api/order.service';
import { CartService } from '@/api/cart.service';

type NavProps = NativeStackNavigationProp<OrdersStackParamList, 'NewOrder'>;

type SelectedProduct = {
  sku: string;
  quantity: number;
  price: number;
  image?: string;
};

type SelectedCustomer = {
  id: number;
  name: string;
  email?: string;
  gender?: string;
};

const { width } = Dimensions.get('window');

const NewOrderScreen = () => {
  const navigation = useNavigation<NavProps>();

  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [cartCode, setCartCode] = useState('');

  const handleSelectCustomer = () => {
    navigation.navigate('SelectCustomer', {
      onSelect: (customer: SelectedCustomer) => {
        setSelectedCustomer(customer);
      },
    } as any);
  };

  const handleSelectProduct = () => {
    navigation.navigate('SelectProduct', {
      onSelect: (products: SelectedProduct[], cartCode: string) => {
        setSelectedProducts(products);
        setCartCode(cartCode);
      },
    } as any);
  };

  const handleCreateOrder = async () => {
    if (!selectedCustomer) {
      alert('Please select a customer.');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }

    if (!cartCode) {
      alert('Cart is empty or not created.');
      return;
    }

    try {
      const service = new orderService();
      const cartServ = new CartService();
      const cart = await cartServ.getCartByCode(cartCode);
      if (cart == null) {
        alert('Cart is empty or not created.');
        return;
      }
      // Build order payload
      const orderData: PersistableOrder = {
        customerId: selectedCustomer.id,
        currency: "CAD",
        payment: {
          amount: `${cart?.total}`,
          paymentModule: "moneyorder",
          paymentToken: "",
          paymentType: "MONEYORDER",
          transactionType: "AUTHORIZECAPTURE"
        }
      };

      const orderConfirmation = await service.createOrder(orderData, cartCode);

      if (orderConfirmation) {
        alert(`Order created successfully! Order #: ${orderConfirmation.id}`);
        console.log("Order created successfully! Order #: ${orderConfirmation.id}");
        // Optionally, reset state or navigate
        setSelectedCustomer(null);
        setSelectedProducts([]);
        setCartCode('');
        navigation.navigate('History'); // or any screen you want
      } else {
        alert('Failed to create order.');
      }
    } catch (error) {
      console.error('Create order error:', error);
      alert('Unexpected error while creating order.');
    }
  };

  return (
    <ChildLayout title="New Order">
      <View style={styles.flexContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer Selection */}
          <View style={styles.selectionCard}>
            <View style={styles.centerContent}>
              {selectedCustomer ? (
                <>
                  <Feather
                    name={selectedCustomer.gender?.toLowerCase() === 'male' ? 'user' : 'user'}
                    size={32}
                    color="#0A3D91"
                    style={{ marginBottom: 8 }}
                  />
                  <Text style={[styles.customerName, { textAlign: 'center', fontSize: 18 }]}>
                    {selectedCustomer.name}
                  </Text>
                  {selectedCustomer.gender && (
                    <Text style={[styles.customerInfo, { textAlign: 'center', fontSize: 14 }]}>
                      Gender: {selectedCustomer.gender}
                    </Text>
                  )}
                  {selectedCustomer.email && (
                    <Text style={[styles.customerInfo, { textAlign: 'center', fontSize: 14 }]}>
                      {selectedCustomer.email}
                    </Text>
                  )}
                </>
              ) : (
                <>
                  <Feather name="user" size={32} color="#0A3D91" />
                  <Text
                    style={[styles.cardTitle, { fontSize: 18, marginTop: 8, textAlign: 'center' }]}
                  >
                    Choose Customer
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={handleSelectCustomer}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.chevronTouchable}
            >
              <Feather name="chevron-right" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Product Selection */}
          <View style={styles.selectionCard}>
            <View style={styles.centerContent}>
              <View style={{ position: 'relative', marginBottom: 12 }}>
                <Feather name="shopping-cart" size={32} color="#0A3D91" />
                {selectedProducts.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{selectedProducts.length}</Text>
                  </View>
                )}
              </View>

              {selectedProducts.length === 0 ? (
                <Text style={[styles.cardTitle, { fontSize: 18, textAlign: 'center' }]}>
                  Choose Products
                </Text>
              ) : (
                <ScrollView
                  style={styles.productListScroll}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={true}
                >
                  {selectedProducts.map((p) => (
                    <View key={p.sku} style={styles.productRow}>
                      <View style={styles.productImageQty}>
                        {p.image ? (
                          <Image source={{ uri: p.image }} style={styles.selectedProductImage} />
                        ) : (
                          <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>No Img</Text>
                          </View>
                        )}
                        <Text style={{ marginLeft: 12, fontSize: 16 }}>× {p.quantity}</Text>
                      </View>
                      <Text style={styles.productPrice}>
                        ${Number(Math.round(p.price * p.quantity)).toLocaleString(undefined)}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSelectProduct}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.chevronTouchable}
            >
              <Feather name="chevron-right" size={28} color="gray" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Create Order Button fixed at bottom */}
        <Pressable style={styles.createOrderButton} onPress={handleCreateOrder}>
          <Text style={styles.createOrderButtonText}>Create Order</Text>
        </Pressable>
      </View>
    </ChildLayout>
  );
};

export default NewOrderScreen;
