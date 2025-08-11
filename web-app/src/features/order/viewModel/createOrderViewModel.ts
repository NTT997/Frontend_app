import { useState } from "react";
import { fetchListCustomer } from "../../customer/api/CustomerApi";
import { fetchListProduct } from "../../product/api/productApi";

const useCreateOrderViewModel = () => {
  //customer
  const [customers, setCustomers] = useState([]);
  const getAllCustomer = async () => {
    const data = await fetchListCustomer();
    if (data) {
      setCustomers(data);
    }
  };
  //product
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredProducts = products.filter((p) =>
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (product) => {
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

  //payment
  const [paymentMethod, setPaymentMethod] = useState("");
  //shipping
  const [shippingAddress, setShippingAddress] = useState("");

  return {
    //customer
    customers,
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
  };
};

export default useCreateOrderViewModel;
