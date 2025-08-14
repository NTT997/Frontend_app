import { Autocomplete, TextField, Typography, Box, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CustomerForm = ({ customers, getAllCustomer, onCustomerSelect }) => {
  const initialValues = {
    customer: null,
    delivery: null,
  };

  const validationSchema = Yup.object({
    customer: Yup.object().nullable().required("Please select a customer"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Selected customer:", values.customer);
  };

  return (
    <Paper sx={{ p: 3, width: "100%", mt: 1, borderRadius: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form>
            <Box display="flex" gap={3} alignItems="flex-start">
              {/* Select Customer */}
              <Box flex={1} display="flex" flexDirection="column" gap={1}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Select Customer
                </Typography>
                <Autocomplete
                  options={customers}
                  getOptionLabel={(option) =>
                    `${option.id} - ${option.emailAddress}`
                  }
                  value={values.customer}
                  onChange={(_, newValue) => {
                    setFieldValue("customer", newValue);
                    setFieldValue("delivery", newValue?.delivery || {});
                    onCustomerSelect?.(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer"
                      variant="outlined"
                      error={touched.customer && Boolean(errors.customer)}
                      helperText={touched.customer && errors.customer}
                      size="small"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </Box>

              {/* Delivery Address */}
              {values.delivery && (
                <Box
                  flex={2}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  ml={4}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Delivery
                  </Typography>
                  <Box display="flex" gap={1}>
                    <TextField
                      label="Full Name"
                      value={`${values.delivery.firstName || ""} ${
                        values.delivery.lastName || ""
                      }`}
                      InputProps={{ readOnly: true }}
                      size="small"
                    />
                    <TextField
                      label="Phone"
                      value={values.delivery.phone || ""}
                      InputProps={{ readOnly: true }}
                      size="small"
                    />
                  </Box>
                  <Box display="flex" gap={1}>
                    <TextField
                      label="Address"
                      value={values.delivery.address || ""}
                      InputProps={{ readOnly: true }}
                      size="small"
                    />
                    <TextField
                      label="City"
                      value={values.delivery.city || ""}
                      InputProps={{ readOnly: true }}
                      size="small"
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CustomerForm;
