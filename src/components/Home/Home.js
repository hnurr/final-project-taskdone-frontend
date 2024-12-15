// src/components/Home/Home.js
import React from "react";
import { Box, TextField, Button } from "@mui/material";
import homeImage from "../Image/home.png";

function HomePage() {
  return (
    <div>
      {/*Background image resmini ekledim*/}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          height: "635px", // Yüksekliği artırdım.
          backgroundImage: `url(${homeImage})`, // Anasayfadaki görseli burada kullandık.
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Arama Çubuğu */}
        <Box
          sx={{
            position: "absolute",
            bottom: "30px", // Görselin alt kısmına yerleştiriyoruz
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Yarı saydam arka plan
            borderRadius: "15px",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Hafif gölge
          }}
        >
          <TextField
            fullWidth
            placeholder="Hizmet veya servis ara..."
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: "white", // Arama kutusunun beyaz olması için
            }}
          />
          <Button
            //Arama butonuna ait tasarım bu şekildedir.

            variant="contained"
            sx={{
              marginTop: "10px",
              width: "100%",
              backgroundColor: "green", // Düğme rengini değiştirdim
              "&:white": {
                backgroundColor: "#303f9f", // Hover durumunda renk değişimi
              },
            }}
          >
            Ara
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
