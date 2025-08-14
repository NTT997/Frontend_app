import { useState } from "react";

import { fetchListCustomer } from "../../customer/api/CustomerApi";
import { fetchListProduct } from "../../product/api/productApi";
import { createOrder, addToCart } from "../api/orderApi";

import {
  type Store,
  type AddToCart,
  type Customer,
  type Payment,
  type PersistableOrder,
  type Product,
} from "@ui/shared-models";
import { fetchStoreInfo } from "../../store/api/storeApi";
import { useNavigate } from "react-router-dom";

const useCreateOrderViewModel = () => {
  //navigate
  const navigate = useNavigate();
  //store
  const [store, setStore] = useState<Store | null>(null);
  const getStoreInfo = async () => {
    const data = await fetchStoreInfo();
    if (data) {
      setStore(data);
    }
  };

  //error
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");

  //customer
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
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

  //cart
  const [cartAmount, setCartAmount] = useState(0);

  //payment
  // const [paymentMethod, setPaymentMethod] = useState([]); //chua xai (goi them api)
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  const submitPayment = async (cartId: string, payload: PersistableOrder) => {
    console.log("payload: ", payload);
    const data = await createOrder(cartId, payload);
    return data;
  };

  const handleCheckout = async () => {
    if (!selectedCustomer) {
      console.warn("Chưa chọn khách hàng");
      setOpenError(true);
      setError("Please Select One Customer!");
      return;
    }
    if (selectedProducts.length === 0) {
      setError("Please Select At Least 1 Product!");
      setOpenError(true);
      return;
    }
    if (!paymentData) {
      setOpenError(true);
      setError("Please Select Payment Method");
      return;
    }

    //getFirstProduct to create Cart
    const firstKey = Object.keys(quantities)[0];
    const firstValue = quantities[firstKey];

    const addToShoppingCart: AddToCart = {
      product: selectedProducts[0].sku,
      quantity: firstValue,
    };

    const cartResponse = await addToCart(addToShoppingCart);
    if (cartResponse !== null) {
      console.log("cart response: ", cartResponse);
      setCartAmount(cartResponse.total);
    }

    //--------------------------------------------------

    const payload = {
      comments: "no comment, this is for testing purpose",
      currency: "CAD",
      customerAgreement: true,
      shippingQuote: 0,
      payment: {
        amount: String(cartResponse.total),
        paymentModule: paymentData.paymentModule,
        paymentToken: "tok_visa", //paymentData.token,,
        paymentType: "CREDITCARD",
        transactionType: "AUTHORIZECAPTURE",
      },
      customerId: selectedCustomer.id,
    };
    try {
      // cartId lấy từ API add-to-cart hoặc backend trả về khi tạo cart
      const cartId = cartResponse.code;
      const res = await submitPayment(cartId, payload);
      console.log("Checkout thành công:", res);
      alert("Order Created Succesfully!");
      navigate("/order");
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
    //cart
    cartAmount,
    setCartAmount,
    //error
    error,
    openError,
    setOpenError,
    //store
    getStoreInfo,
    store,
  };
};

export default useCreateOrderViewModel;
