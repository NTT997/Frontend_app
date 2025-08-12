// src/components/PaymentForm.jsx
import { useState } from "react";
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

  //error
  const [openError, setOpenError] = useState(false);

  const handleGenerateToken = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      <ErrorPopup
        errorMessage={error}
        onClose={() => setOpenError(false)}
        open={openError}
      />;
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
      <Box mt={2}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleGenerateToken}
          disabled={loading}
        >
          {loading ? "Processing..." : "Generate Token"}
        </Button>
      </Box>
    </>
  );
};

const PaymentForm = ({ onPaymentChange }) => {
  const [paymentModule, setPaymentModule] = useState("stripe");
  const [environment, setEnvironment] = useState("TEST");
  const [publishableKey, setPublishableKey] = useState(
    "pk_test_51RlmCSCNMdKsUXus3GW6O1Y6U3HJxu7N7mdNcFWq3AH7kiB4MFgOq7lBhcmIjfdDH8DuVZYXnUbW5sL3TFTD5K6E00YLwrCl8p"
  );

  return (
    <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography variant="h6">Payment</Typography>

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
        </RadioGroup>
      </FormControl>

      {/* Chọn môi trường */}
      {paymentModule === "stripe" && (
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

      {/* Nhập thẻ */}
      {paymentModule === "stripe" && publishableKey && (
        <Elements stripe={loadStripe(publishableKey)}>
          <PaymentFormInner
            paymentModule={paymentModule}
            environment={environment}
            onPaymentChange={onPaymentChange}
            publishableKey={publishableKey}
          />
        </Elements>
      )}
    </Box>
  );
};

export default PaymentForm;
