// src/components/PaymentForm.jsx
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ErrorPopup from "../../../components/ErrorPopup";

const PaymentFormInner = ({
  paymentModule,
  environment,
  onPaymentChange,
  publishableKey,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Error state
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateToken = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong");
      setOpenError(true);
      setLoading(false);
      return;
    }

    // Trả token cho parent
    onPaymentChange({
      paymentModule,
      environment,
      token: token.id,
    });

    setLoading(false);
    alert("Generate Token successfully!");
  };

  return (
    <>
      {/* Thẻ nhập thông tin thẻ */}
      <Box mt={2} sx={{ p: 1.5, border: "1px solid #ddd", borderRadius: 2 }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Box>

      {/* Nút tạo token */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateToken}
          disabled={loading}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            "&:hover": { backgroundColor: "#1976d2" },
          }}
        >
          {loading ? "Processing..." : "Generate Token"}
        </Button>
      </Box>

      {/* Popup báo lỗi */}
      <ErrorPopup
        open={openError}
        errorMessage={errorMessage}
        onClose={() => setOpenError(false)}
      />
    </>
  );
};

const PaymentForm = ({ onPaymentChange, store, getStore }) => {
  const [paymentModule, setPaymentModule] = useState("stripe");
  const [environment, setEnvironment] = useState("TEST");
  const [publishableKey] = useState(
    "pk_test_51RlmCSCNMdKsUXus3GW6O1Y6U3HJxu7N7mdNcFWq3AH7kiB4MFgOq7lBhcmIjfdDH8DuVZYXnUbW5sL3TFTD5K6E00YLwrCl8p"
  );

  // Dùng useMemo để tránh loadStripe lại mỗi lần render
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey]
  );

  const handleMoneyOrderConfirm = () => {
    onPaymentChange({
      paymentModule: "moneyorder",
      environment,
      token: null,
    });
    alert("Money Order selected!");
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <Box
      mt={2}
      p={3}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 3,
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Payment
      </Typography>

      {/* Chọn phương thức */}
      <FormControl>
        <FormLabel>Payment Module</FormLabel>
        <RadioGroup
          value={paymentModule}
          onChange={(e) => setPaymentModule(e.target.value)}
        >
          <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
          <FormControlLabel
            value="moneyorder"
            control={<Radio />}
            label="Money Order"
          />
        </RadioGroup>
      </FormControl>

      {/* Chọn môi trường */}
      {(paymentModule === "stripe" || paymentModule === "moneyorder") && (
        <FormControl sx={{ mt: 1 }}>
          <FormLabel>Environment</FormLabel>
          <RadioGroup
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          >
            <FormControlLabel value="TEST" control={<Radio />} label="Test" />
            <FormControlLabel value="PROD" control={<Radio />} label="Live" />
          </RadioGroup>
        </FormControl>
      )}

      {/* Stripe */}
      {paymentModule === "stripe" && publishableKey && (
        <Elements stripe={stripePromise}>
          <PaymentFormInner
            paymentModule={paymentModule}
            environment={environment}
            onPaymentChange={onPaymentChange}
            publishableKey={publishableKey}
          />
        </Elements>
      )}

      {/* Money Order */}
      {paymentModule === "moneyorder" && (
        <Box mt={2} sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 2 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            Please send your money order to:
            {"\n"}
            {store.name}
            {"\n"}
            {store.address.address}, {store.address.city}
          </Typography>
          <Button
            sx={{
              mt: 1.5,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
            variant="contained"
            color="primary"
            onClick={handleMoneyOrderConfirm}
          >
            Confirm Money Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;
