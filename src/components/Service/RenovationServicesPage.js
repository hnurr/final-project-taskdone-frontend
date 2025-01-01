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

// Tadilat hizmetlerini listeleyen array
const renovationServices = [
  {
    id: 1,
    name: "Boya Badana",
    description: "Evinizi yenilemek için boya badana hizmeti.",
    image: "/assets/boya.png",
  },
  {
    id: 2,
    name: "Mutfak Dolabı",
    description: "Modern ve şık mutfak dolapları.",
    image: "/assets/mutfakdolabı.png",
  },
  {
    id: 3,
    name: "Parke Döşeme",
    description: "Dayanıklı ve estetik parke döşeme hizmeti.",
    image: "/assets/parkedöşeme.png",
  },
  {
    id: 6,
    name: "Kapı Değişimi",
    description: "Evinize uygun modern kapılar.",
    image: "/assets/kapıdeğişim.png",
  },
  {
    id: 8,
    name: "Duvar Kağıdı",
    description: "Duvarlarınızı güzelleştiren tasarımlar.",
    image: "/assets/duvarkagıdı.png",
  },
];

function RenovationServicesPage() {
  // Hizmet al butonuna tıklandığında tetiklenen fonksiyon
  const handleServiceRequest = (serviceName) => {
    alert(`${serviceName} hizmetini almak için talebiniz alındı!`);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Tadilat Hizmetleri
      </Typography>
      <Grid container spacing={3}>
        {renovationServices.map((service) => (
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
                height: 300, // Kartın yüksekliğini arttırarak görselin daha geniş görünmesini sağlıyoruz
              }}
            >
              <CardMedia
                component="img"
                image={service.image}
                alt={service.name}
                sx={{
                  height: "140px", // Görselin yüksekliğini ayarlıyoruz
                  width: "95%", // Görselin genişliğini %100 yapıyoruz
                  objectFit: "cover", // Görseli kapsayacak şekilde kesiyoruz
                  borderRadius: "8px 8px 0 0", // Sadece üst kısmını yuvarlatıyoruz
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

export default RenovationServicesPage;
