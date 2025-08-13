import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productService } from '@/api/product.service';
import { Product } from '@ui/shared-models';
import styles from './SelectProduct.style'
import { CartService } from '@/api/cart.service';
import { AddToCart } from '@ui/shared-models';
import { Feather } from '@expo/vector-icons';

type SelectedProduct = {
  sku: string;
  quantity: number;
  price: number;
  image?: string;
};

type Cart = AddToCart;

const SelectProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantityInput, setQuantityInput] = useState<string>('0');
  const cartService = new CartService();

  // Track multiple selected products
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const service = new productService();
        const data = await service.getProductList({});
        if (data && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
        Alert.alert('Error', 'Could not load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductSku = (sku?: string) => {
    return sku || 'Unknown SKU';
  };

  // Get quantity already selected for product (if any)
  const getSelectedQuantity = (sku: string) => {
    const found = selectedProducts.find((p) => p.sku === sku);
    return found ? found.quantity : 0;
  };

  const openQuantityModal = (product: Product) => {
    setSelectedProduct(product);
    // Set quantity input to current selected quantity or 0
    setQuantityInput(String(getSelectedQuantity(product.sku)));
    setModalVisible(true);
  };

  const maxQuantity = selectedProduct?.quantity ?? 1000000; // fallback max

  const incrementQuantity = () => {
    let current = parseInt(quantityInput, 10);
    if (isNaN(current)) current = 0;
    if (current < maxQuantity) {
      setQuantityInput(String(current + 1));
    }
  };

  const decrementQuantity = () => {
    let current = parseInt(quantityInput, 10);
    if (isNaN(current)) current = 0;
    if (current > 0) {
      setQuantityInput(String(current - 1));
    }
  };

  const confirmQuantity = () => {
    let quantity = parseInt(quantityInput.trim(), 10);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a number greater than 0.');
      return;
    }
    if (quantity > maxQuantity) {
      Alert.alert('Invalid Quantity', `Maximum available quantity is ${maxQuantity}.`);
      return;
    }
    if (selectedProduct) {
      setSelectedProducts((prev) => {
        const existsIndex = prev.findIndex((p) => p.sku === selectedProduct.sku);
        const newEntry = {
          sku: selectedProduct.sku,
          quantity,
          price: selectedProduct.price ?? 0,
          image: selectedProduct.image?.path,
        };
        if (existsIndex >= 0) {
          const newSelections = [...prev];
          newSelections[existsIndex] = newEntry;
          return newSelections;
        } else {
          return [...prev, newEntry];
        }
      });
    }
    setModalVisible(false);
  };

  const finishSelection = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert('No products selected', 'Please select at least one product.');
      return;
    }

    try {
      const firstProduct = selectedProducts[0];

      const createPayload: AddToCart = {
        product: firstProduct.sku,
        quantity: firstProduct.quantity,
      };

      const createdCart = await cartService.createCart(createPayload);

      if (!createdCart) {
        Alert.alert('Error', 'Failed to create cart.');
        return;
      }

      const cartCode = createdCart.code;

      if (!createdCart) {
        Alert.alert('Error', 'Failed to create cart.');
        return;
      }

      for (let i = 1; i < selectedProducts.length; i++) {
        const product = selectedProducts[i];
        const updatePayload: AddToCart = {
          product: product.sku,
          quantity: product.quantity,
        };

        const updatedCart = await cartService.updateCart(cartCode, updatePayload);

        if (!updatedCart) {
          Alert.alert('Error', `Failed to add product ${product.sku} to cart.`);
          return;
        }
      }

      if (route.params?.onSelect) {
        route.params.onSelect(selectedProducts, cartCode);
      }
      
      navigation.goBack();

    } catch (error) {
      console.error('Cart operation error:', error);
      Alert.alert('Error', 'Unexpected error while processing the cart.');
    }
  };

  return (
    <ChildLayout title="Select Product">
      {loading ? (
        <ActivityIndicator size="large" color="#0A3D91" style={{ marginTop: 20 }} />
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id?.toString() || item.sku}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => openQuantityModal(item)}>
                <View style={styles.itemContent}>
                  {item.image ? (
                    <Image source={{ uri: item.image.path }} style={styles.productImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>No Image</Text>
                    </View>
                  )}
                  <View style={styles.productInfo}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.sku}>SKU: {item.sku}</Text>
                      <Text style={styles.price}>
                        ${item.price != null ? Number(Math.round(item.price)).toLocaleString(undefined) : '0'}
                      </Text>
                    </View>
                    <Text style={styles.quantity}>Inventory: {item.quantity ?? 0}</Text>
                    <Text style={styles.selectedQuantity}>
                      Selected: {getSelectedQuantity(item.sku)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Show summary of selected products */}
          {selectedProducts.length > 0 && (
            <View style={styles.bottomSheet}>
              <ScrollView contentContainerStyle={styles.bottomSheetContent}>
                {selectedProducts.map((p) => {
                  const prod = products.find((prod) => prod.sku === p.sku);
                  const unitPrice = prod?.price ?? 0;
                  const totalPrice = unitPrice * p.quantity;

                  return (
                    <View key={p.sku} style={styles.item}>
                      <View style={styles.itemContent}>
                        {prod?.image ? (
                          <Image source={{ uri: prod.image.path }} style={styles.productImage} />
                        ) : (
                          <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>No Image</Text>
                          </View>
                        )}
                        <View style={styles.productInfo}>
                          <View style={styles.rowBetween}>
                            <Text style={styles.sku}>SKU: {p.sku}</Text>
                            <Text style={styles.price}>
                              ${Number(Math.round(unitPrice)).toLocaleString(undefined)}
                            </Text>
                          </View>
                          <Text style={styles.quantity}>Selected: {p.quantity}</Text>
                          <Text style={styles.totalPrice}>
                            Total: ${Number(Math.round(totalPrice)).toLocaleString(undefined)}
                          </Text>

                          {/* Remove icon */}
                          <Pressable
                            onPress={() => {
                              setSelectedProducts((prev) =>
                                prev.filter((item) => item.sku !== p.sku)
                              );
                            }}
                            style={{ position: 'absolute', right: 0, top: 8, padding: 8 }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          >
                            <Feather name="trash-2" size={20} color="red" />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  );

                })}
              </ScrollView>

              <Pressable style={styles.doneButton} onPress={finishSelection}>
                <Text style={styles.doneButtonText}>Done</Text>
              </Pressable>
            </View>
          )}

          {/* Done Button */}
          <Pressable style={styles.doneButton} onPress={finishSelection}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </>
      )}

      {/* Quantity Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter Quantity for{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {getProductSku(selectedProduct?.sku)}
              </Text>
            </Text>

            <View style={styles.quantityInputContainer}>
              <Pressable style={styles.qtyButton} onPress={decrementQuantity}>
                <Text style={styles.qtyButtonText}>−</Text>
              </Pressable>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantityInput}
                onChangeText={(text) => {
                  // Allow only numbers, limit max quantity
                  const num = text.replace(/[^0-9]/g, '');
                  let val = num === '' ? '0' : num;
                  if (parseInt(val, 10) > maxQuantity) {
                    val = String(maxQuantity);
                  }
                  setQuantityInput(val);
                }}
                placeholder="Quantity"
                autoFocus={true}
              />

              <Pressable style={styles.qtyButton} onPress={incrementQuantity}>
                <Text style={styles.qtyButtonText}>+</Text>
              </Pressable>
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.okButton]} onPress={confirmQuantity}>
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ChildLayout>
  );
};



export default SelectProductScreen;
