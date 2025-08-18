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
      sx={{
        background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 4,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            BTM GLOBAL
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Please login to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                LOGIN
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginScreen;
