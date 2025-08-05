import React from "react";
import useLoginViewModel from "../viewModel/loginViewModel";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

const LoginScreen = () => {
  const { username, setUsername, password, setPassword, error, handleLogin } =
    useLoginViewModel();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      sx={{ bgcolor: "primary.main" }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Đăng nhập
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{ marginTop: 3 }}
            >
              <TextField
                label="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />

              <Button variant="contained" type="submit" fullWidth>
                Đăng nhập
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginScreen;
