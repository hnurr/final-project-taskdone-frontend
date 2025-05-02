import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  LinearProgress,
} from "@mui/material";
import illerData from "./iller.json";

const steps = [
  "Halı Nerede Yıkansın?",
  "Kaç Metrekare?",
  "Leke Durumu",
  "Parça Sayısı",
  "Konum",
  "İletişim",
];

function HaliYikamaForm({
  serviceName = "Ofis Halı Yıkama",
  priceRange = "600 TL - 3.900 TL",
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    yikamaYeri: "",
    metrekare: "",
    lekeDurumu: "",
    parcaSayisi: "",
    il: "",
    ilce: "",
    adSoyad: "",
    telefon: "",
    email: "",
  });

  const totalSteps = steps.length;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    if (activeStep < totalSteps - 1) setActiveStep((prev) => prev + 1);
    else handleSubmit();
  };
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Gönderilen veriler:", formData);
    alert("Talebiniz başarıyla alındı.");
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <RadioGroup
            value={formData.yikamaYeri}
            onChange={handleChange("yikamaYeri")}
          >
            {["Yerinde", "Yıkamacıda"].map((o) => (
              <FormControlLabel
                key={o}
                value={o}
                control={
                  <Radio
                    sx={{
                      color: "#56ab2f",
                      "&.Mui-checked": { color: "#56ab2f" },
                    }}
                  />
                }
                label={o}
              />
            ))}
          </RadioGroup>
        );
      case 1:
        return (
          <FormControl fullWidth>
            <Select
              value={formData.metrekare}
              onChange={handleChange("metrekare")}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seçiniz
              </MenuItem>
              {[10, 20, 30, 40].map((val) => (
                <MenuItem key={val} value={val}>
                  {val} m²
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 2:
        return (
          <RadioGroup
            value={formData.lekeDurumu}
            onChange={handleChange("lekeDurumu")}
          >
            {[
              "Evet, çıkması gereken lekeler var",
              "Hayır, standart yeterli",
            ].map((o) => (
              <FormControlLabel
                key={o}
                value={o}
                control={
                  <Radio
                    sx={{
                      color: "#56ab2f",
                      "&.Mui-checked": { color: "#56ab2f" },
                    }}
                  />
                }
                label={o}
              />
            ))}
          </RadioGroup>
        );
      case 3:
        return (
          <FormControl fullWidth>
            <Select
              value={formData.parcaSayisi}
              onChange={handleChange("parcaSayisi")}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seçiniz
              </MenuItem>
              {["1", "2", "3", "4"].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 4:
        return (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>İl</InputLabel>
              <Select
                value={formData.il}
                onChange={handleChange("il")}
                label="İl"
              >
                {illerData.map((i) => (
                  <MenuItem key={i.il} value={i.il}>
                    {i.il}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.il && (
              <FormControl fullWidth>
                <InputLabel>İlçe</InputLabel>
                <Select
                  value={formData.ilce}
                  onChange={handleChange("ilce")}
                  label="İlçe"
                >
                  {illerData
                    .find((i) => i.il === formData.il)
                    .ilceler.map((ic) => (
                      <MenuItem key={ic} value={ic}>
                        {ic}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </>
        );
      case 5:
        return (
          <>
            <TextField
              fullWidth
              label="Ad Soyad"
              value={formData.adSoyad}
              onChange={handleChange("adSoyad")}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Telefon"
              value={formData.telefon}
              onChange={handleChange("telefon")}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="E-posta"
              value={formData.email}
              onChange={handleChange("email")}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: 400, borderRadius: 2, overflow: "hidden" }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2, borderBottom: "1px solid #eee" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {serviceName}
          </Typography>
        </Box>
        {/* Progress & Price */}
        <Box sx={{ px: 2, pt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / totalSteps) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#56ab2f" },
            }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ mt: 1, mb: 2 }}
          >
            <Typography variant="caption" color="text.secondary">
              Ortalama fiyat aralığı:
            </Typography>
            <Typography variant="caption" color="text.primary">
              {priceRange}
            </Typography>
          </Box>
        </Box>
        {/* Content */}
        <Box sx={{ p: 2 }}>{renderContent()}</Box>
        {/* Footer Buttons */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={activeStep === totalSteps - 1 ? handleSubmit : handleNext}
            sx={{
              backgroundColor: "#56ab2f",
              color: "#fff",
              height: 48,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#3e8e1e" },
            }}
          >
            {activeStep === totalSteps - 1 ? "Gönder" : "Devam"}
          </Button>
          {activeStep > 0 && (
            <Button
              fullWidth
              variant="text"
              onClick={handleBack}
              sx={{ mt: 1 }}
            >
              Geri
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default HaliYikamaForm;
