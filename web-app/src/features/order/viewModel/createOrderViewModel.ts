import { useState } from "react";

import { fetchListCustomer } from "../../customer/api/CustomerApi";
import { fetchListProduct } from "../../product/api/productApi";
import { createOrder } from "../api/orderApi";

import type { Product } from "@ui/shared-models";

const useCreateOrderViewModel = () => {
  //customer
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const getAllCustomer = async () => {
    const data = await fetchListCustomer();
    if (data) {
      setCustomers(data);
    }
  };
  //product
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const filteredProducts = products.filter((p) =>
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (product: Product) => {
    const exist = selectedProducts.find((p) => p.id === product.id);
    if (exist) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const getAllProduct = async () => {
    const data = await fetchListProduct();
    if (data) {
      setProducts(data);
    }
  };

  const removeItem = (product: Product) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
  };

  const handleConfirm = () => {
    console.log(`Chose ${selectedProducts.length} products`);
    setOpen(false);
  };

  //payment
  // const [paymentMethod, setPaymentMethod] = useState([]); //chua xai (goi them api)
  const [paymentData, setPaymentData] = useState(null);

  const submitPayment = async (cartId: string, payload: PaymentRequest) => {
    console.log("payload: ", payload);
    const data = await createOrder(cartId, payload);
    return data;
  };

  const handleCheckout = async () => {
    if (!selectedCustomer) {
      console.warn("Chưa chọn khách hàng");
      return;
    }
    if (selectedProducts.length === 0) {
      console.warn("Chưa chọn sản phẩm");
      return;
    }
    if (!paymentData) {
      console.warn("Chưa nhập thông tin thanh toán");
      return;
    }

    const payload = {
      comments: "no comment, this is for testing purpose",
      currency: "CAD",
      customerAgreement: true,
      shippingQuote: 0,
      payment: {
        amount: "5000000",
        paymentModule: paymentData.method,
        paymentToken: paymentData.token,
        paymentType: "CREDITCARD",
        transactionType: "AUTHORIZECAPTURE",
      },
      customerId: selectedCustomer.id,
    };
    try {
      // cartId lấy từ API add-to-cart hoặc backend trả về khi tạo cart
      const cartId = "18a77426285346d7a48dfce49edca4ba";
      const res = await submitPayment(cartId, payload);
      console.log("Checkout thành công:", res);
    } catch (err) {
      console.error("Checkout thất bại:", err);
    }
  };

  return {
    //customer
    customers,
    selectedCustomer,
    setSelectedCustomer,
    setCustomers,
    getAllCustomer,
    //[products]
    products,
    getAllProduct,
    open,
    setOpen,
    search,
    setSearch,
    filteredProducts,
    selectedProducts,
    setSelectedProducts,
    toggleSelect,
    removeItem,
    handleConfirm,
    quantities,
    setQuantities,
    //payment
    paymentData,
    setPaymentData,
    submitPayment,
    handleCheckout,
  };
};

export default useCreateOrderViewModel;
