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
import useFiyatVerisi from "./UseFiyatVerisi";

const steps = [
  "Halı Nerede Yıkansın?",
  "Kaç Metrekare?",
  "Leke Durumu",
  "Parça Sayısı",
  "Konum",
  "İletişim",
];

export default function HaliYikamaForm({
  serviceName = "Ofis Halı Yıkama",
  defaultPrice = "600 TL - 3900 TL",
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

  const [priceRangeResult, setPriceRangeResult] = useState(defaultPrice);
  const totalSteps = steps.length;
  const fiyatVerisi = useFiyatVerisi();

  useEffect(() => {
    if (fiyatVerisi.length === 0) return;

    console.log("Veri örneği:", fiyatVerisi[0]);

    const filteredPrices = fiyatVerisi.find(
      (satir) =>
        satir.yikama_yeri === formData.yikamaYeri &&
        satir.metrekare === String(formData.metrekare) &&
        satir.leke_durumu === formData.lekeDurumu &&
        satir.parca_sayisi === String(formData.parcaSayisi) &&
        satir.il === formData.il &&
        satir.ilce === formData.ilce
    );

    /**   const filteredPrices = fiyatVerisi.filter((item) => {
      return (
        (!formData.il || item.il === formData.il) &&
        (!formData.ilce || item.ilce === formData.ilce) &&
        (!formData.yikamaYeri ||
          item.yikama_yeri === formData.yikamaYeri.toLowerCase()) &&
        (!formData.metrekare ||
          Number(item.metrekare) === Number(formData.metrekare)) &&
        (!formData.lekeDurumu ||
          item.leke_durumu ===
            (formData.lekeDurumu.includes("Evet") ? "leke_var" : "leke_yok")) &&
        (!formData.parcaSayisi ||
          Number(item.parca_sayisi) === Number(formData.parcaSayisi))
      );
    });*/

    if (filteredPrices) {
      //const fiyatlar = filteredPrices.map((item) =>Number(item.fiyat.toString().replace(/\D/g, "")))
      const fiyat = Number(filteredPrices.fiyat.toString().replace(/\D/g, ""));

      // const minFiyat = Math.min(...fiyatlar);
      //  const maxFiyat = Math.max(...fiyatlar);

      setPriceRangeResult(`${fiyat} TL - ${fiyat} TL`);
    } else {
      setPriceRangeResult(defaultPrice);
    }
  }, [formData, fiyatVerisi, defaultPrice]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () =>
    activeStep < totalSteps - 1 && setActiveStep((prev) => prev + 1);
  const handleBack = () => activeStep > 0 && setActiveStep((prev) => prev - 1);

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <RadioGroup
            value={formData.yikamaYeri}
            onChange={handleChange("yikamaYeri")}
          >
            {["Yerinde", "Yikamaci"].map((o) => (
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
              "Evet, cikmasi gereken lekeler var",
              "Hayir, standart yeterli",
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
