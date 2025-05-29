import React, { useState, useEffect } from "react";
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
import UseKoltukYikamaFiyatVerisi from "./UseKoltukYikamaFiyatVerisi";

const steps = [
  "Koltuk Tipi",
  "Koltuk Sayısı",
  "Leke Durumu",
  "Konum",
  "İletişim",
];

export default function KoltukYikamaForm({
  serviceName = "Koltuk Yıkama Hizmeti",
  defaultPrice = "300 TL - 2500 TL",
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    koltukTipi: "",
    koltukSayisi: "",
    lekeDurumu: "",
    il: "",
    ilce: "",
    adSoyad: "",
    telefon: "",
    email: "",
  });

  const [priceRangeResult, setPriceRangeResult] = useState(defaultPrice);
  const totalSteps = steps.length;
  const fiyatVerisi = UseKoltukYikamaFiyatVerisi();

  useEffect(() => {
    if (fiyatVerisi.length === 0) return;

    const filteredPrices = fiyatVerisi.filter((item) => {
      return Object.entries(formData).every(([key, value]) => {
        if (!value) return true;
        switch (key) {
          case "il":
            return item.il === value;
          case "ilce":
            return item.ilce === value;
          case "koltukTipi":
            return item.koltuk_tipi === value;
          case "koltukSayisi":
            return Number(item.koltuk_sayisi) === Number(value);
          case "lekeDurumu":
            return item.leke_durumu === value;
          default:
            return true;
        }
      });
    });

    if (filteredPrices.length > 0) {
      const fiyatlar = filteredPrices.map((item) =>
        Number(item.fiyat.toString().replace(/\D/g, ""))
      );
      const minFiyat = Math.min(...fiyatlar);
      const maxFiyat = Math.max(...fiyatlar);
      setPriceRangeResult(`${minFiyat} TL - ${maxFiyat} TL`);
    } else {
      setPriceRangeResult(defaultPrice);
    }
  }, [formData, fiyatVerisi, defaultPrice]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "il" ? { ilce: "" } : {}),
    }));
  };

  const handleNext = () =>
    activeStep < totalSteps - 1 && setActiveStep((prev) => prev + 1);
  const handleBack = () => activeStep > 0 && setActiveStep((prev) => prev - 1);

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <RadioGroup
            value={formData.koltukTipi}
            onChange={handleChange("koltukTipi")}
          >
            {["Tekli", "İkili", "Üçlü", "L Köşe", "U Köşe"].map((o) => (
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
              value={formData.koltukSayisi}
              onChange={handleChange("koltukSayisi")}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seçiniz
              </MenuItem>
              {[1, 2, 3, 4, 5, 6].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
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
            {["Evet, zor lekeler var", "Hayır, genel temizlik yeterli"].map(
              (o) => (
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
              )
            )}
          </RadioGroup>
        );
      case 3:
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
                    .ilceler.map((ilce) => (
                      <MenuItem key={ilce} value={ilce}>
                        {ilce}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </>
        );
      case 4:
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {serviceName}
          </Typography>
        </Box>

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
              {priceRangeResult}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>{renderContent()}</Box>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
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
