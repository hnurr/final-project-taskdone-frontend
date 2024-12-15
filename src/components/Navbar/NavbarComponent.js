import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

function NavbarComponent({ isLoggedIn }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {isLoggedIn ? (
        <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
      ) : (
        <Typography variant="body1">Giriş Yapılmadı</Typography>
      )}
    </Box>
  );
}

export default NavbarComponent;
