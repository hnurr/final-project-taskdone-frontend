import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import logo from "../Image/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
const pages = ["Hizmetler", "Hizmet Verenler", "Yardım"];

function Navbar({ isLoggedIn, updateLoginStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null); // Avatar menüsü için state
  const navigate = useNavigate();
  const location = useLocation(); // Mevcut sayfanın yolunu almak için kullanılır

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Avatar tıklanınca menüyü aç
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Menü kapanır
  };

  const handleLoginClick = () => {
    navigate("/login"); // Login sayfasına yönlendir
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    updateLoginStatus(false); // Giriş durumu güncellenir
    setAnchorEl(null); // Menü kapatılır
    navigate("/"); // Anasayfaya yönlendirilir
  };

  // Eğer "/provider-dashboard" sayfasındaysak Navbar'ı render etme
  if (location.pathname === "/provider-dashboard") {
    return null;
  }

  // Eğer "/admin-dashboard" sayfasındaysak Navbar'ı render etme
  if (location.pathname === "/admin-dashboard") {
    return null; //deneme
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            TASKDONE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  if (page === "Hizmetler") {
                    navigate("/service"); // Hizmetler butonuna tıklandığında yönlendirme yapılır
                  }

                  if (page == "Hizmet Verenler") {
                    navigate("/service-provider-all");
                  }
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!isLoggedIn && (
            <Button
              sx={{ my: 2, color: "black" }}
              onClick={() => navigate("/hizmet-ver")}
            >
              Hizmet Ver
            </Button>
          )}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <>
                {/* Avatar ve menu sadece login olduğunda görünür */}
                <Avatar
                  sx={{ marginRight: 2, cursor: "pointer" }}
                  onClick={handleMenuOpen}
                >
                  {JSON.parse(
                    localStorage.getItem("user")
                  )?.email?.[0]?.toUpperCase() || "?"}
                </Avatar>

                {/* Avatar menüsü */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)} // Menü açılma durumu
                  onClose={handleMenuClose} // Menü kapanma fonksiyonu
                >
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button sx={{ my: 2, color: "black" }} onClick={handleLoginClick}>
                Giriş Yap
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.defaultProps = {
  isLoggedIn: false,
  updateLoginStatus: () => {},
};

export default Navbar;
