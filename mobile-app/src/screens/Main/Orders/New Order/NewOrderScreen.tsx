import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Pressable, Dimensions, } from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OrdersStackParamList } from '@/navigations/OrderStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './NewOrder.style';
import { Payment, PAYMENT_METHODS, PaymentMethodKey, PersistableOrder, ReadableShoppingCartItem } from '@ui/shared-models';
import { orderService } from '@/api/order.service';
import { CartService } from '@/api/cart.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { clearCartCode } from '@/redux/cartSlice';
import { clearCartCodeStorage } from '@/utils/cartStorage';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import type { CardFieldInput } from '@stripe/stripe-react-native';

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

const NewOrderScreen = () => {
  const navigation = useNavigation<NavProps>();

  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [cartCode, setCartCode] = useState('');
  const reduxCartCode = useSelector((state: RootState) => state.cart.code);
  const cartService = new CartService();
  const dispatch = useDispatch<AppDispatch>();

  const [paymentType, setPaymentType] = useState<PaymentMethodKey>(PaymentMethodKey.MONEYORDER);
  const [stripeModalVisible, setStripeModalVisible] = useState(false);

  const { createPaymentMethod } = useStripe(); // Stripe hook
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!reduxCartCode) return;

      try {
        const cart = await cartService.getCartByCode(reduxCartCode);
        if (cart?.products?.length) {
          const mappedProducts: SelectedProduct[] = cart.products.map((item: ReadableShoppingCartItem) => ({
            sku: item.sku,
            quantity: item.quantity,
            price: item.price ?? 0,
            image: item.image?.path,
          }));

          setSelectedProducts(mappedProducts);
          setCartCode(reduxCartCode);
        } else {
          setSelectedProducts([]);
          setCartCode(reduxCartCode);
        }
      } catch (error) {
        console.error('Failed to fetch cart items on load:', error);
        setSelectedProducts([]);
        setCartCode('');
      }
    };

    fetchCartProducts();
  }, [reduxCartCode]);

  const handleSubmitCard = async () => {
    if (!cardDetails?.complete) {
      alert("Please enter complete card info.");
      return;
    }

    try {
      // Only type and billingDetails are needed
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: 'Card',
      });

      if (error) {
        console.error('Stripe error:', error);
        alert(error.message);
        return;
      }

      if (!paymentMethod?.id) {
        alert("Failed to create payment method.");
        return;
      }

      // Store the PaymentMethod ID for order submission
      setStripePaymentMethodId(paymentMethod.id);
      setStripeModalVisible(false);
      alert("Card successfully saved. You can now submit the order.");
    } catch (err) {
      console.error('Stripe payment error:', err);
      alert('Payment failed. Try again.');
    }
  };


  const handleSelectCustomer = () => {
    navigation.navigate('SelectCustomer', {
      onSelect: (customer: SelectedCustomer) => {
        setSelectedCustomer(customer);
      },
    } as any);
  };

  const handleSelectProduct = () => {
    navigation.navigate('SelectProduct', {
      preselectedProducts: selectedProducts,
      cartCode: reduxCartCode,
      onSelect: (products: SelectedProduct[], code: string) => {
        setSelectedProducts(products);
        setCartCode(code);
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

      if (!cart) {
        return alert('Cart is empty or not created.');
      }

      let payment: Payment = {
        amount: `${cart?.total}`,
        transactionType: "AUTHORIZECAPTURE",
      };

      if (paymentType === PaymentMethodKey.MONEYORDER) {
        payment.paymentToken = "";
        payment.paymentModule = "moneyorder";
        payment.paymentType = "MONEYORDER";
      } else if (paymentType === PaymentMethodKey.STRIPE) {
        if (!stripePaymentMethodId) {
          alert("Please enter card information first.");
          return;
        }
        payment.paymentModule = "stripe";
        payment.paymentType = "CREDITCARD";
        // payment.paymentToken = stripePaymentMethodId; // Use saved PaymentMethod ID
        payment.paymentToken = "tok_visa";
      } else {
        alert("Unsupported payment type.");
        return;
      }

      console.log(payment);


      const orderData: PersistableOrder = {
        comments: "",
        currency: "CAD",
        customerAgreement: true,
        shippingQuote: 0,
        payment,
        customerId: selectedCustomer.id,
      };

      console.log(orderData);


      // Build order payload
      // const orderData: PersistableOrder = {
      //   customerId: selectedCustomer.id,
      //   currency: "CAD",
      //   payment: {
      //     amount: `${cart?.total}`,
      //     paymentModule: "moneyorder",
      //     paymentToken: "",
      //     paymentType: "MONEYORDER",
      //     transactionType: "AUTHORIZECAPTURE"
      //   }
      // };

      const orderConfirmation = await service.createOrder(orderData, cartCode);

      if (orderConfirmation) {
        alert(`Order created successfully! Order #: ${orderConfirmation.id}`);
        console.log("Order created successfully! Order #: ${orderConfirmation.id}");

        // Optionally, reset state or navigate
        setSelectedCustomer(null);
        setSelectedProducts([]);
        setCartCode('');

        dispatch(clearCartCode());
        clearCartCodeStorage()

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

          {/* Payment Type Selection */}
          <View style={[styles.selectionCard, styles.paymentCard]}>
            <Text style={styles.cardTitle}>Payment Method</Text>

            <View style={styles.radioGroupVertical}>
              {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  style={styles.radioRow}
                  onPress={() => {
                    setPaymentType(key as PaymentMethodKey);
                    if (key === PaymentMethodKey.STRIPE) {
                      setStripeModalVisible(true);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.radioOuter}>
                    {paymentType === key && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>


        </ScrollView>

        {/* Create Order Button fixed at bottom */}
        <Pressable style={styles.createOrderButton} onPress={handleCreateOrder}>
          <Text style={styles.createOrderButtonText}>Create Order</Text>
        </Pressable>
      </View>

      {/* Stripe Card Information */}
      {stripeModalVisible && (
        <View style={styles.stripeModalOverlay}>
          <View style={styles.stripeModalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
              Enter Card Information
            </Text>

            <CardField
              postalCodeEnabled={true}
              placeholders={{ number: '4242 4242 4242 4242' }}
              cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
              style={{ width: '100%', height: 50, marginVertical: 10 }}
              onCardChange={(details) => setCardDetails(details)}
            />

            <Pressable style={styles.modalButton} onPress={handleSubmitCard}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>

            <Pressable
              style={[styles.modalButton, { marginTop: 8, backgroundColor: '#777' }]}
              onPress={() => setStripeModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      )}

    </ChildLayout>
  );
};

export default NewOrderScreen;
