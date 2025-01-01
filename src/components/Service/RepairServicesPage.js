import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

// Tamirat hizmetlerini listeleyen array
const repairServices = [
  {
    id: 1,
    name: "Elektrik Tesisat Tamiri",
    description: "Profesyonel elektrik tesisat tamiri hizmeti.",
    image: "/assets/elektiriktesisat.png", // Görsel yolu
  },
  {
    id: 2,
    name: "Su Tesisatı Tamiri",
    description: "Su tesisatındaki arızalar için hızlı çözüm.",
    image: "/assets/sutesisattamiri.png", // Görsel yolu
  },
  {
    id: 3,
    name: "Kapı ve Pencere Tamiri",
    description: "Kapı ve pencere tamiri için profesyonel hizmet.",
    image: "/assets/kapıpenceretamiri.png", // Görsel yolu
  },
  {
    id: 4,
    name: "Isıtma Sistemi Tamiri",
    description: "Isıtma sistemlerinin bakım ve tamiri.",
    image: "/assets/ısıtmasistemitamiri.png", // Görsel yolu
  },
  {
    id: 5,
    name: "Beyaz Eşya Tamiri",
    description: "Beyaz eşyanızın tamiri ve bakımı.",
    image: "/assets/beyazeşyatamiri.png", // Görsel yolu
  },
];

function RepairServicesPage() {
  // Hizmet al butonuna tıklandığında tetiklenen fonksiyon
  const handleServiceRequest = (serviceName) => {
    alert(`${serviceName} hizmetini almak için talebiniz alındı!`);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Tamirat Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {repairServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                maxWidth: 280, // Kart genişliği
                margin: "auto",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 320, // Kart yüksekliği
              }}
            >
              <CardMedia
                component="img"
                image={service.image}
                alt={service.name}
                sx={{
                  height: 140, // Resim yüksekliği
                  objectFit: "contain", // Resim düzeni
                  margin: "8px",
                  borderRadius: "8px",
                }}
              />
              <CardContent sx={{ padding: "8px" }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleServiceRequest(service.name)}
                sx={{
                  margin: "8px",
                  backgroundColor: "green",
                  fontSize: "14px",
                  padding: "4px 8px",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
              >
                Hizmet Al
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RepairServicesPage;
