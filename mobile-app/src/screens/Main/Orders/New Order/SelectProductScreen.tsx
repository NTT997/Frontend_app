import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
import { Product, Description } from '@ui/shared-models';

type SelectedProduct = {
  sku: string;
  quantity: number;
};

const SelectProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantityInput, setQuantityInput] = useState<string>('0');

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

  const getProductName = (descriptions?: Description[], lang = 'en'): string => {
    if (!descriptions || descriptions.length === 0) return 'Unnamed Product';
    const descByLang = descriptions.find((d) => d.language === lang);
    return descByLang?.name || descriptions[0].name || 'Unnamed Product';
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
        if (existsIndex >= 0) {
          const newSelections = [...prev];
          newSelections[existsIndex] = { sku: selectedProduct.sku, quantity };
          return newSelections;
        } else {
          return [...prev, { sku: selectedProduct.sku, quantity }];
        }
      });
    }
    setModalVisible(false);
  };

  const finishSelection = () => {
    if (route.params?.onSelect) {
      route.params.onSelect(selectedProducts);
    }
    navigation.goBack();
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
                  {/* Image */}
                  {item.image ? (
                    <Image source={{ uri: item.image.path }} style={styles.productImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>No Image</Text>
                    </View>
                  )}

                  {/* Info: SKU and Quantity */}
                  <View style={styles.productInfo}>
                    <Text style={styles.sku}>SKU: {item.sku}</Text>
                    <Text style={styles.quantity}>
                      Inventory: {item.quantity ?? 0}
                    </Text>
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
            <View style={styles.selectionSummary}>
              <Text style={styles.selectionSummaryTitle}>Selected Products:</Text>
              <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10 }}>
                {selectedProducts.map((p) => (
                  <View key={p.sku} style={styles.selectedProductBadge}>
                    <Text style={styles.selectedProductText}>
                      {p.sku} × {p.quantity}
                    </Text>
                  </View>
                ))}
              </ScrollView>
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
                {getProductName(selectedProduct?.descriptions)}
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

const styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#888',
    fontSize: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  selectedQuantity: {
    fontSize: 14,
    color: '#0A3D91',
    marginTop: 2,
    fontWeight: '600',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sku: {
    fontSize: 14,
    color: '#777',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qtyButton: {
    backgroundColor: '#0A3D91',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  qtyButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  okButton: {
    backgroundColor: '#0A3D91',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  selectionSummary: {
    marginVertical: 12,
  },
  selectionSummaryTitle: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
    color: '#0A3D91',
    paddingLeft: 10,
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
  doneButton: {
    backgroundColor: '#0A3D91',
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SelectProductScreen;
