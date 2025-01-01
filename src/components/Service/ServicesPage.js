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
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Temizlik",
    description: "Profesyonel temizlik hizmetleri.",
    image: "/assets/temizlik.png", // public klasöründeki yol
  },
  {
    id: 2,
    name: "Tadilat",
    description: "Su tesisatı onarım hizmetleri.",
    image: "/assets/tadilat.png", // public klasöründeki yol
  },
  {
    id: 3,
    name: "Tamirat",
    description: "Elektrik arıza tamiri ve montaj.",
    image: "/assets/tamirat.png", // public klasöründeki yol
  },
  {
    id: 4,
    name: "Organizasyon",
    description: "Etkinlik organizasyonu hizmetleri.",
    image: "/assets/organizasyonlogo.png", // public klasöründeki yol
  },
  {
    id: 5,
    name: "Sağlık",
    description: "Sağlık danışmanlığı hizmetleri.",
    image: "/assets/saglık.png", // public klasöründeki yol
  },
  {
    id: 6,
    name: "Nakliyat",
    description: "Taşıma ve nakliye hizmetleri.",
    image: "/assets/nakliyat.png", // public klasöründeki yol
  },
];

function ServicesPage() {
  const navigate = useNavigate();

  const handleCardClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Hizmetler
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                width: 300,
                height: 400,
                margin: "auto",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                "&:hover": {
                  // Kart hover olduğunda arka plan rengini değiştirecek stil
                  "& .card-overlay": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Grilik efekti ekliyoruz
                  },
                  "& .card-overlay-text": {
                    color: "white", // Yazıyı beyaz yapıyoruz
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                image={service.image} // Görseller artık public klasöründen alınıyor
                alt={service.name}
                sx={{
                  height: 250,
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />
              <Box
                className="card-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0)", // Başlangıçta şeffaf
                  color: "black", // Başlangıçta yazı beyaz
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <Typography className="card-overlay-text" variant="h6">
                  {service.name}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCardClick(service.id)}
                sx={{
                  margin: "16px",
                  alignSelf: "center",
                  backgroundColor: "green",
                }}
              >
                Detaylar
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ServicesPage;
