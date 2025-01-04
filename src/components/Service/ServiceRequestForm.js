import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function ServiceRequestForm() {
  const location = useLocation();
  const { serviceName } = location.state || {};

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Şehir ve ilçe verileri
  const cityDistricts = {
    İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
    Ankara: ["Çankaya", "Keçiören", "Mamak"],
    İzmir: ["Konak", "Karşıyaka", "Bornova"],
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(""); // İl değiştiğinde ilçe sıfırlanır
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form başarıyla gönderildi!");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #a8e063, #56ab2f)", // Yeşil gradient arka plan
        padding: "20px",
      }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper
          elevation={8}
          sx={{
            padding: "30px",
            borderRadius: "16px",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#56ab2f" }}
          >
            Hizmet Talep Formu
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            gutterBottom
            sx={{ marginBottom: "20px", color: "#333" }}
          >
            {serviceName
              ? `${serviceName} Hizmeti İçin Bilgilerinizi Girin`
              : "Lütfen Bilgilerinizi Girin"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Ad Soyad Alanı */}
            <TextField
              fullWidth
              label="Adınız ve Soyadınız"
              variant="outlined"
              margin="normal"
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            />
            {/* Telefon Numarası Alanı */}
            <TextField
              fullWidth
              label="Telefon Numaranız"
              variant="outlined"
              margin="normal"
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            />
            {/* E-Posta Alanı */}
            <TextField
              fullWidth
              label="E-Posta Adresiniz"
              type="email"
              variant="outlined"
              margin="normal"
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            />
            {/* İl ve İlçe Seçimi */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>İl Seçin</InputLabel>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              >
                {Object.keys(cityDistricts).map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>İlçe Seçin</InputLabel>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedCity} // İl seçilmeden ilçe seçilemez
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              >
                {selectedCity &&
                  cityDistricts[selectedCity].map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* Adres Alanı */}
            <TextField
              fullWidth
              label="Adresiniz"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            />
            {/* Hizmet Kategorisi */}
            <TextField
              fullWidth
              label="Hizmet Kategorisi"
              value={serviceName || ""}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                backgroundColor: "#e9fbe6",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            />
            <Box
              display="flex"
              justifyContent="center"
              sx={{ marginTop: "20px" }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#56ab2f",
                  color: "#fff",
                  padding: "10px 30px",
                  "&:hover": {
                    backgroundColor: "#3e8e1e",
                  },
                }}
              >
                Gönder
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ServiceRequestForm;
