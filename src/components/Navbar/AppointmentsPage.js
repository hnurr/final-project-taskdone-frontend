import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function AppointmentsPage() {
  const userId = localStorage.getItem("userId");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!userId) return; // userId yoksa istek atma

    fetch(`http://localhost:8080/api/appointments/customer/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `API isteği başarısız oldu, HTTP status: ${response.status}`
          );
        }
        return response.text(); // JSON yerine düz metin al
      })
      .then((text) => {
        console.log("API Yanıtı (ham veri):", text); // Gelen veriyi göster

        try {
          const jsonData = JSON.parse(text); // JSON'a çevir
          console.log("API'den Gelen JSON:", jsonData);
          setAppointments(Array.isArray(jsonData) ? jsonData : []);
        } catch (jsonError) {
          console.error("JSON parse hatası:", jsonError);
          throw new Error("Sunucu geçersiz JSON döndürdü!");
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", margin: 2 }}>
        Randevularım
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>id</strong>
              </TableCell>
              <TableCell>
                <strong>Tarih</strong>
              </TableCell>
              <TableCell>
                <strong>Saat</strong>
              </TableCell>
              <TableCell>
                <strong>Hizmet Veren Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Hizmet Veren Soyadı</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori</strong>
              </TableCell>
              <TableCell>
                <strong>Adres</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.appointmentDate}</TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>{appointment.providerName}</TableCell>
                  <TableCell>{appointment.providerSurname}</TableCell>
                  <TableCell>{appointment.providerCategory}</TableCell>
                  <TableCell>{appointment.providerAddress}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Randevunuz bulunmamaktadır.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AppointmentsPage;
