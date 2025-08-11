import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";

import { tokens } from "../../../theme/theme";

const ProductSelector = ({
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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* button for opening dialog */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Chọn sản phẩm
      </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Choose Products</DialogTitle>
        <DialogContent>
          <TextField
            label="Search products here..."
            fullWidth
            margin="normal"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Sku</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Case have filteredProducts */}
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.finalPrice}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={
                        !!selectedProducts.find((p) => p.id === product.id)
                      }
                      onSelect={() => toggleSelect(product)}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {/* Case no filteredProducts */}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    None Product Match!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Danh sách sản phẩm đã chọn */}
          <Box mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Sản phẩm đã chọn:
            </Typography>
            {selectedProducts.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                List Products chose will be displayed here!
              </Typography>
            )}
            <Box display="flex" gap={1} flexWrap="wrap">
              {selectedProducts.map((product) => (
                <Chip
                  key={product.id}
                  label={product.sku}
                  onDelete={() => removeSelected(product)}
                />
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            disabled={selectedProducts.length === 0}
            // onClick={handleOk}
          >
            CONFIRM
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductSelector;
