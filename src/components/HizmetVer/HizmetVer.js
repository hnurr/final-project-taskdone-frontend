import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HizmetVer() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Yeni durum: Kaydolu mu?
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isRegistered) {
      // Daha önce kaydolmuş bir kullanıcı ise giriş yapılacak
      if (!email || !password) {
        alert("Lütfen e-posta ve şifreyi giriniz.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/login/login", {
          email,
          password,
        });

        alert("Başarıyla giriş yapıldı!");
        navigate("/dashboard"); // Başarılı giriş sonrası yönlendirme
      } catch (error) {
        console.error("Giriş yapılırken bir hata oluştu:", error);
        alert("Giriş yapılamadı, lütfen tekrar deneyin.");
      }
    } else {
      // Yeni hizmet veren kaydedilecek
      if (
        !name ||
        !surname ||
        !phone ||
        !email ||
        !country ||
        !city ||
        !district ||
        !neighborhood ||
        !serviceArea ||
        !password ||
        password !== confirmPassword
      ) {
        alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/login/register/provider",
          {
            name: name,
            surname: surname,
            phoneNumber: phone,
            email: email,

            country: country,
            city: city,
            district: district,
            neighborhood: neighborhood,

            isCompany: isCompany,
            companyName: companyName,
            serviceArea: serviceArea,
            password: password,
          }
        );

        alert("Hesap başarıyla oluşturuldu!");
        navigate("/login"); // Başarılı bir şekilde ekledikten sonra login sayfasına yönlendir
      } catch (error) {
        console.error("Hesap oluşturulurken bir hata oluştu:", error);
        alert("Hesap oluşturulamadı, lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "400px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistered ? "Giriş Yap" : "Hizmet Ver"}
        </Typography>

        {isRegistered ? (
          // Giriş Formu
          <>
            <TextField
              label="E-posta"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Şifre"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              style={{ marginTop: "20px", background: "green" }}
            >
              Giriş Yap
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "10px" }}
            >
              Yeni hesap oluşturmak için{" "}
              <Button color="primary" onClick={() => setIsRegistered(false)}>
                tıklayın
              </Button>
            </Typography>
          </>
        ) : (
          // Yeni Kayıt Formu
          <>
            <TextField
              label="İsim"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Soyisim"
              variant="outlined"
              fullWidth
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Telefon Numarası"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="E-posta"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Ülke"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="İl"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="İlçe"
              variant="outlined"
              fullWidth
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Mahalle"
              variant="outlined"
              fullWidth
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel>Şahıs mı Şirket mi?</InputLabel>
              <Select
                value={isCompany}
                onChange={(e) => setIsCompany(e.target.value)}
                label="Şahıs mı Şirket mi?"
              >
                <MenuItem value={false}>Şahıs</MenuItem>
                <MenuItem value={true}>Şirket</MenuItem>
              </Select>
            </FormControl>

            {isCompany && (
              <TextField
                label="Şirket Adı"
                variant="outlined"
                fullWidth
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
            )}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel>Hizmet Alanı</InputLabel>
              <Select
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
              >
                <MenuItem value="Ev Temizliği">Ev Temizliği</MenuItem>
                <MenuItem value="Tesisat">Tesisat</MenuItem>
                <MenuItem value="Boya">Boya</MenuItem>
                <MenuItem value="Elektrik">Elektrik</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Şifre"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />

            <TextField
              label="Şifreyi Onayla"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              style={{ marginTop: "20px", background: "green" }}
            >
              Hizmet Ver
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "10px" }}
            >
              Zaten hizmet veriyor musunuz?{" "}
              <Button color="primary" onClick={() => setIsRegistered(true)}>
                Giriş Yap
              </Button>
            </Typography>
          </>
        )}
      </Box>
    </div>
  );
}

export default HizmetVer;
