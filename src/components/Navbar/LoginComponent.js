import React from "react";
import { Box, Button } from "@mui/material";

function LoginComponent({ updateLoginStatus }) {
  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email: "user@example.com" }));
    updateLoginStatus(true); // Kullanıcı giriş yaptı
  };

  /*return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Giriş Yap
      </Button>
    </Box>
  );*/
}

export default LoginComponent;
