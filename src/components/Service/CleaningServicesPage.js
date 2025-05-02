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

// Temizlik hizmetlerini listeleyen array
const cleaningServices = [
  {
    id: 1,
    name: "Koltuk Yıkama",
    description: "Profesyonel koltuk yıkama hizmeti.",
    image: "/assets/koltukyıkama.png",
  },
  {
    id: 2,
    name: "Ev Temizliği",
    description: "Dip köşe ev temizliği hizmeti.",
    image: "/assets/evtemizliği.png",
  },
  {
    id: 3,
    name: "İnşaat Sonrası Temizlik",
    description: "İnşaat sonrası detaylı temizlik.",
    image: "/assets/inşaatsonrasıtemizlik.png",
  },
  {
    id: 4,
    name: "Bahçe Temizliği",
    description: "Bahçenizi temiz ve düzenli tutmak için.",
    image: "/assets/bahçetemizliği.png",
  },
  {
    id: 5,
    name: "Cam Temizliği",
    description: "Pırıl pırıl camlar için profesyonel hizmet.",
    image: "/assets/camtemizliği.png",
  },
  {
    id: 6,
    name: "Halı Yıkama",
    description: "Halılarınızın hijyenik temizliği için.",
    image: "/assets/halıyıkama.png",
  },
  {
    id: 7,
    name: "Petek Temizliği",
    description: "Kış aylarına hazırlık için petek temizliği.",
    image: "/assets/petektemizliği.png",
  },
  {
    id: 8,
    name: "Klima Temizliği",
    description: "Temiz ve sağlıklı hava için klima temizliği.",
    image: "/assets/klimatemizliği.png",
  },
];

function CleaningServicesPage() {
  const navigate = useNavigate();

  const handleServiceRequest = (serviceName) => {
    if (serviceName === "Halı Yıkama") {
      navigate("/hali-yikama");
    } else {
      navigate("/service-request", { state: { serviceName } });
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Temizlik Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {cleaningServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                maxWidth: 250,
                margin: "auto",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 300,
              }}
            >
              <CardMedia
                component="img"
                image={service.image}
                alt={service.name}
                sx={{
                  height: 120,
                  objectFit: "contain",
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

export default CleaningServicesPage;
