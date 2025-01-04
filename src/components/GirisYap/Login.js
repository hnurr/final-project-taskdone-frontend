import {
  InputLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ updateLoginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleRegister = () => {
    sendRequest("register");
  };

  const handleLogin = async () => {
    const isSuccess = await sendRequest("login");
    if (isSuccess) {
      // Giriş başarılı olduktan sonra kullanıcıyı localStorage'a kaydediyoruz
      localStorage.setItem("user", JSON.stringify({ email }));

      updateLoginStatus(true); // Giriş durumu güncelle
    }
  };

  const sendRequest = async (path) => {
    try {
      const response = await axios.post(`http://localhost:8080/login/${path}`, {
        email: email,
        password: password,
      });

      if (response && response.data) {
        alert("Giriş başarılı!");
        const userId = response.data.id; // Backend'den dönen kullanıcı ID'si
        if (userId) {
          console.log("Kullanıcı ID'si kaydedildi:", userId);
          // Bu ID'yi bir global state (Redux, Context) veya localStorage gibi bir yerde saklayabilirsiniz
          localStorage.setItem("userId", userId);
        } else {
          console.error("Kullanıcı ID'si alınamadı.");
        }

        console.log("Backend Cevabı:", response); // Backend'den gelen yanıtı kontrol edin

        // Backend'den dönen role bilgisini al
        const userRole = response.data.role?.toLowerCase(); // Küçük harfe çevir
        console.log("Gelen rol bilgisi:", userRole); // Rol bilgisini kontrol et

        switch (userRole) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "customer":
            navigate("/");
            break;
          case "provider":
            navigate("/provider-dashboard");
            break;
          default:
            alert(
              "Tanımlanamayan bir rol algılandı. Lütfen tekrar giriş yapın!"
            );
            navigate("/login"); // Sadece login sayfasına yönlendir
            return; // Daha fazla işlem yapılmasını engelle
        }

        return true; // Başarı durumunda true döner
      }
    } catch (err) {
      console.log("err", err);
      const message =
        err?.response?.data?.message || "Bilinmeyen bir hata oluştu.";
      alert(message);
      return false; // Hata durumunda false döner
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "white",
      }}
    >
      <FormControl
        style={{
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "white",
        }}
      >
        <InputLabel
          shrink={false}
          style={{ textAlign: "center", width: "100%", top: 20 }}
        >
          email
        </InputLabel>
        <Input
          name="email"
          value={email}
          onChange={(i) => handleEmail(i.target.value)}
        />
        <InputLabel
          shrink={false}
          style={{ marginTop: 80, textAlign: "center", width: "100%" }}
        >
          password
        </InputLabel>
        <Input
          style={{ marginTop: 20 }}
          type="password"
          value={password}
          onChange={(i) => handlePassword(i.target.value)}
        />
        <Button
          variant="contained"
          style={{
            marginTop: 40,
            background: "green",
            color: "white",
          }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <FormHelperText style={{ margin: 20 }}>
          Are you already registered?
        </FormHelperText>
        <Button
          variant="contained"
          style={{
            background: "green",
            color: "white",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}

export default Login;
