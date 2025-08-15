import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useForm, Controller } from "react-hook-form";
import type { Order, OrderResubmitPayload } from "@ui/shared-models";
import { resubmitOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const OrderDetailDrawer: React.FC<Props> = ({
  open,
  order,
  onClose,
  onSuccess,
}) => {
  //theme
  const theme = useTheme();

  const { control, handleSubmit, reset } = useForm<Order>({});

  const navigate = useNavigate();

  React.useEffect(() => {
    if (order) {
      reset(order);
    }
  }, [order, reset]);

  const onSubmit = async (data: Order) => {
    if (!data) return;
    console.log("Resubmit payload:", data);

    const payload: OrderResubmitPayload = {
      billing: data.billing,
      delivery: data.delivery,
      emailAddress: data.customer.emailAddress,
    };

    await resubmitOrder(payload, data.id);
    onClose();
    alert("Resubmit Order Successfully!");
    navigate("/order");
    onSuccess?.();
  };

  const EditableField = ({
    name,
    label,
    readOnly = false,
  }: {
    name: any;
    label: string;
    readOnly?: boolean;
  }) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          size="small"
          fullWidth
          label={label}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      )}
    />
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ background: theme.palette.primary.main, color: "#fff" }}
      >
        Order #{order?.id ?? ""}
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          Date Purchased:{" "}
          {order?.datePurchased
            ? new Date(order.datePurchased).toLocaleDateString()
            : ""}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Section title="Store Information">
          <Grid container spacing={2}>
            <Grid>
              <EditableField readOnly name="store.code" label="Code" />
            </Grid>
            <Grid>
              <EditableField readOnly name="store.name" label="Name" />
            </Grid>
            <Grid>
              <EditableField readOnly name="store.email" label="Email" />
            </Grid>
            <Grid>
              <EditableField readOnly name="store.phone" label="Phone" />
            </Grid>
          </Grid>
        </Section>

        <Section title="Billing Address">
          <Grid container spacing={2}>
            <Grid>
              <EditableField name="billing.firstName" label="First Name" />
            </Grid>
            <Grid>
              <EditableField name="billing.lastName" label="Last Name" />
            </Grid>
            <Grid>
              <EditableField name="billing.address" label="Address" />
            </Grid>
            <Grid>
              <EditableField name="billing.phone" label="Phone" />
            </Grid>
            <Grid>
              <EditableField name="billing.email" label="Email" />
            </Grid>
            <Grid>
              <EditableField name="billing.company" label="Company" />
            </Grid>

            <Grid>
              <EditableField name="billing.postalCode" label="Postal Code" />
            </Grid>
            <Grid>
              <EditableField name="billing.city" label="City" />
            </Grid>

            <Grid>
              <EditableField name="billing.country" label="Country" />
            </Grid>
          </Grid>
        </Section>

        <Section title="Ordered Products">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                <TableCell>SKU</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.products?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{item.orderedQuantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.subTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Typography sx={{ mb: 2, textAlign: "right" }}>
          Total: {order?.total.value}
        </Typography>

        <Section title="Delivery Address">
          <Grid container spacing={2}>
            <Grid>
              <EditableField name="delivery.firstName" label="First Name" />
            </Grid>
            <Grid>
              <EditableField name="delivery.lastName" label="Last Name" />
            </Grid>
            <Grid>
              <EditableField name="delivery.address" label="Address" />
            </Grid>

            <Grid>
              <EditableField readOnly name="delivery.phone" label="Phone" />
            </Grid>
            <Grid>
              <EditableField readOnly name="delivery.company" label="Company" />
            </Grid>
            <Grid>
              <EditableField name="delivery.city" label="City" />
            </Grid>
            <Grid>
              <EditableField name="delivery.postalCode" label="Postal Code" />
            </Grid>
            <Grid>
              <EditableField name="delivery.country" label="Country" />
            </Grid>
            <Grid>
              <EditableField name="delivery.countryName" label="Country Name" />
            </Grid>
          </Grid>
        </Section>
      </DialogContent>

      <DialogActions
        sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Resubmit
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDrawer;
