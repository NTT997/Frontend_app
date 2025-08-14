import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";

import { tokens } from "../../../theme/theme";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const ProductSelector = ({
  setOpen,
  open,
  search,
  setSearch,
  filteredProducts,
  selectedProducts,
  toggleSelect,
  removeItem,
  onConfirm,
  quantities,
  setQuantities,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mt={1} borderRadius={2} boxShadow={2}>
      {/* Button mở dialog */}
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ m: 2 }}>
        SELECT PRODUCT
      </Button>

      {selectedProducts && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT ID</TableCell>
              <TableCell>PRODUCT SKU</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>QUANTITY</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((p) => (
              <TableRow>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={quantities[p.id] || 1}
                    onChange={(e) => {
                      let newQty = parseInt(e.target.value) || 0;
                      if (newQty > p.quantity) {
                        alert(`Không đủ tồn kho: ${p.quantity}`);
                        newQty = p.quantity;
                      }
                      if (newQty < 1) newQty = 1;
                      setQuantities((prev) => ({
                        ...prev,
                        [p.id]: newQty,
                      }));
                    }}
                  />
                </TableCell>
                <TableCell>
                  {Number(p.price) * Number(quantities[p.id] || 1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h3" fontWeight="bold">
            Choose Products
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ minHeight: 400 }}>
          {/* Search input */}
          <TextField
            label="Search products here..."
            fullWidth
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Product list table */}
          <Table size="small" sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Sku</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => toggleSelect(product)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProducts.some(
                          (p) => p.id === product.id
                        )}
                        onChange={() => toggleSelect(product)}
                        onClick={(e) => e.stopPropagation()}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.finalPrice}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    None Product Match!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Selected products */}
          <Typography variant="h6" gutterBottom>
            Selected Products
          </Typography>
          {selectedProducts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No products selected yet.
            </Typography>
          ) : (
            <Paper
              variant="outlined"
              sx={{ maxHeight: 200, overflowY: "auto" }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Sku</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.finalPrice}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Remove product">
                          <IconButton
                            onClick={() => removeItem(product)}
                            size="small"
                            sx={{ color: colors.redAccent[500] }}
                          >
                            <RemoveShoppingCartIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

          {/* Confirm button */}
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              disabled={selectedProducts.length === 0}
              onClick={onConfirm}
            >
              CONFIRM
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductSelector;
