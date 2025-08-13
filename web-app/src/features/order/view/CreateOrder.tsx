import { Box, Button } from "@mui/material";

import CustomerForm from "../components/ListCustomer";
import ProductSelector from "../components/ProductSelector";
import PaymentForm from "../view/PaymentForm";
import ErrorPopup from "../../../components/ErrorPopup";

import useCreateOrderViewModel from "../viewModel/createOrderViewModel";

import { useEffect } from "react";

const CreateOrder = () => {
  const {
    // customer:
    //selectedCustomer,
    setSelectedCustomer,
    customers,
    getAllCustomer,
    //products[]
    setOpen,
    open,
    getAllProduct,
    search,
    setSearch,
    filteredProducts,
    selectedProducts,
    toggleSelect,
    removeItem,
    handleConfirm,
    quantities,
    setQuantities,
    //payment
    // paymentData,
    setPaymentData,
    //submitPayment, //goi trong handle checkout
    handleCheckout,
    //error
    openError,
    setOpenError,
    error,
    //store
    store,
    getStoreInfo,
  } = useCreateOrderViewModel();

  useEffect(() => {
    getAllCustomer();
    getAllProduct();
  }, []);

  return (
    <Box m={2} gap={2}>
      <CustomerForm
        customers={customers}
        getAllCustomer={getAllCustomer}
        onCustomerSelect={setSelectedCustomer}
      />
      <ProductSelector
        setOpen={setOpen}
        open={open}
        search={search}
        setSearch={setSearch}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        toggleSelect={toggleSelect}
        removeItem={removeItem}
        onConfirm={handleConfirm}
        quantities={quantities}
        setQuantities={setQuantities}
      />
      <PaymentForm
        onPaymentChange={setPaymentData}
        store={store}
        getStore={getStoreInfo}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
      >
        CONFIRM ORDER
      </Button>
      {error !== "" && (
        <ErrorPopup
          onClose={() => setOpenError(false)}
          open={openError}
          errorMessage={error}
        />
      )}
    </Box>
  );
};

export default CreateOrder;
