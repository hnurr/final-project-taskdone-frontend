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

// Organizasyon hizmetlerini listeleyen array
const organizationServices = [
  {
    id: 1,
    name: "Düğün Organizasyonu",
    description:
      "Hayalinizdeki düğünü gerçeğe dönüştürmek için profesyonel hizmet.",
    image: "/assets/düğün.png",
  },
  {
    id: 2,
    name: "Doğum Günü Partisi",
    description: "Unutulmaz doğum günü partileri için yaratıcı çözümler.",
    image: "/assets/doğumgünü.png",
  },

  {
    id: 3,
    name: "Açılış Törenleri",
    description:
      "Açılış törenlerinizi etkileyici bir şekilde organize ediyoruz.",
    image: "/assets/açılış.png",
  },
];

function OrganizationServicesPage() {
  // Hizmet al butonuna tıklandığında tetiklenen fonksiyon
  const handleServiceRequest = (serviceName) => {
    alert(`${serviceName} hizmetini almak için talebiniz alındı!`);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Organizasyon Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {organizationServices.map((service) => (
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

export default OrganizationServicesPage;
