import { Box, Button } from "@mui/material";

import CustomerForm from "../components/ListCustomer";
import ProductSelector from "../components/ProductSelector";
import PaymentForm from "../view/PaymentForm";

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
  } = useCreateOrderViewModel();

  // const submitPayment = async (cartId: string, payload: PaymentRequest) => {
  //   console.log("payload: ", payload);

  //   try {
  //     const { data } = await axios.post(
  //       `${BASE_API_GATEWAY_URL}/private/ordering/cart/${cartId}/checkout`,
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBzaG9waXplci5jb20iLCJhdWQiOiJhcGkiLCJwZXJtaXNzaW9uIjpbeyJhdXRob3JpdHkiOiJST0xFX0FVVEgifSx7ImF1dGhvcml0eSI6IkFVVEgifSx7ImF1dGhvcml0eSI6IlNVUEVSQURNSU4ifSx7ImF1dGhvcml0eSI6IkFETUlOIn0seyJhdXRob3JpdHkiOiJQUk9EVUNUUyJ9LHsiYXV0aG9yaXR5IjoiT1JERVIifSx7ImF1dGhvcml0eSI6IkNPTlRFTlQifSx7ImF1dGhvcml0eSI6IlNUT1JFIn0seyJhdXRob3JpdHkiOiJUQVgifSx7ImF1dGhvcml0eSI6IlBBWU1FTlQifSx7ImF1dGhvcml0eSI6IkNVU1RPTUVSIn0seyJhdXRob3JpdHkiOiJTSElQUElORyJ9XSwiZXhwIjoxNzU1MTU1MTM0LCJpYXQiOjE3NTQ1NTAzMzR9.VuTiI7PegIGBkmKd2Wdw_OP085mfF4KJEBmpG7WGhsRn7k8xiC6bbWcykx2uUcN87PuJp02aY9UVMpGaIX_UxA`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return data;
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       console.error("Backend error:", err.response?.data);
  //     }
  //   }
  // };

  // const handleCheckout = async () => {
  //   if (!paymentData) {
  //     console.warn("Chưa nhập thông tin thanh toán");
  //     return;
  //   }
  //   if (!selectedCustomer) {
  //     console.warn("Chưa chọn khách hàng");
  //     return;
  //   }
  //   if (selectedProducts.length === 0) {
  //     console.warn("Chưa chọn sản phẩm");
  //     return;
  //   }

  //   const payload = {
  //     comments: "no comment, this is for testing purpose",
  //     currency: "CAD",
  //     customerAgreement: true,
  //     shippingQuote: 0,
  //     payment: {
  //       amount: "5000000",
  //       paymentModule: paymentData.method,
  //       paymentToken: paymentData.token,
  //       paymentType: "CREDITCARD",
  //       transactionType: "AUTHORIZECAPTURE",
  //     },
  //     customerId: selectedCustomer.id,
  //   };
  //   try {
  //     // cartId lấy từ API add-to-cart hoặc backend trả về khi tạo cart
  //     const cartId = "18a77426285346d7a48dfce49edca4ba";
  //     const res = await submitPayment(cartId, payload);
  //     console.log("Checkout thành công:", res);
  //   } catch (err) {
  //     console.error("Checkout thất bại:", err);
  //   }
  // };

  //--------

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
      <PaymentForm onPaymentChange={setPaymentData} />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
      >
        CONFIRM ORDER
      </Button>
    </Box>
  );
};

export default CreateOrder;

// PaymentRequest.ts
export interface PaymentRequest {
  id: number;
  comments: string;
  currency: string;
  customerAgreement: boolean;
  shippingQuote: number;
  payment: PaymentInfo;
  // customer: MinimalCustomer;
  customerId: number;
}

export interface PaymentInfo {
  amount: string;
  paymentModule: string;
  paymentToken: string;
  paymentType: string;
  transactionType: string;
}
