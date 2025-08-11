import { Box } from "@mui/material";
import CustomerForm from "../components/ListCustomer";
import ProductSelector from "../components/ProductSelector";
import useCreateOrderViewModel from "../viewModel/createOrderViewModel";
import { useEffect } from "react";

const CreateOrder = () => {
  const {
    //customer
    customers,
    getAllCustomer,
    //products[]
    products,
    setOpen,
    open,
    getAllProduct,
    search,
    setSearch,
    filteredProducts,
    selectedProducts,
    setSelectedProducts,
    toggleSelect,
  } = useCreateOrderViewModel();

  useEffect(() => {
    getAllCustomer();
    getAllProduct();
  }, []);

  useEffect(() => {
    console.log("products updated:", products);
  }, [products]);

  return (
    <Box m={2} gap={2}>
      <CustomerForm customers={customers} getAllCustomer={getAllCustomer} />
      <ProductSelector
        products={products}
        setOpen={setOpen}
        open={open}
        getAllProduct={getAllProduct}
        search={search}
        setSearch={setSearch}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        toggleSelect={toggleSelect}
      />
    </Box>
  );
};

export default CreateOrder;
