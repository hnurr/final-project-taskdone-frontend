import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

// Sağlık hizmetlerini listeleyen array
const healthServices = [
  {
    id: 1,
    name: "Spor Koçu",
    description: "Genel sağlık taraması ile vücudunuzu kontrol edin.",
    image: "/assets/spor.png",
  },
  {
    id: 2,
    name: "Yaşam Koçu",
    description: "Diş sağlığınız için profesyonel bakım ve tedavi.",
    image: "/assets/yasamkocu.png",
  },
  {
    id: 3,
    name: "Fizik Tedavi",
    description: "Kas ve eklem rahatsızlıklarınız için fizik tedavi hizmeti.",
    image: "/assets/fiziktedavi.png",
  },
  {
    id: 4,
    name: "Psikolog",
    description: "Ruh sağlığınızı iyileştirmek için uzman desteği.",
    image: "/assets/psikolog.png",
  },
  {
    id: 5,
    name: "Diyet ve Beslenme Danışmanlığı",
    description: "Sağlıklı bir yaşam için kişisel diyet planları.",
    image: "/assets/diyet.png",
  },
];

function HealthServicesPage() {
  const navigate = useNavigate();

  const handleServiceRequest = (serviceName) => {
    navigate("/service-request", { state: { serviceName } });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Sağlık Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {healthServices.map((service) => (
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

export default HealthServicesPage;
