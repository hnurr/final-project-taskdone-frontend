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

// Nakliyat hizmetlerini listeleyen array
const transportServices = [
  {
    id: 1,
    name: "Evden Eve Nakliyat",
    description: "Eşyalarınızı güvenle taşıyoruz.",
    image: "/assets/evdeneve.png",
  },

  {
    id: 2,
    name: "Parça Eşya Taşıma",
    description: "Parça eşyalarınız için ekonomik nakliyat hizmeti.",
    image: "/assets/parçaeşya.png",
  },
  {
    id: 3,
    name: "Şehirler Arası Nakliyat",
    description: "Şehirler arası güvenli taşımacılık hizmeti.",
    image: "/assets/şehirlerarası.png",
  },
  {
    id: 4,
    name: "Depolama Hizmeti",
    description: "Eşyalarınız için güvenli depolama alanı.",
    image: "/assets/depolama.png",
  },
];

function TransportServicesPage() {
  // Hizmet al butonuna tıklandığında tetiklenen fonksiyon
  const handleServiceRequest = (serviceName) => {
    alert(`${serviceName} hizmetini almak için talebiniz alındı!`);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Nakliyat Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {transportServices.map((service) => (
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

export default TransportServicesPage;
