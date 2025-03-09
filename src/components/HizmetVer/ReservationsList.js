import React, { useEffect, useState } from "react";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const providerId = localStorage.getItem("userId");

  useEffect(() => {
    const providerId = localStorage.getItem("userId"); // Dinamik olarak ID al

    if (!providerId) {
      console.error("User ID bulunamadı!");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/appointments/provider/${providerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veriler alınamadı!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Veri:", data);
        setReservations(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [providerId]); // Boş bağımlılık array'i sayesinde sadece 1 kez çalışır

  if (loading) {
    return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Randevularım</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
            <th>ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Telefon Numarası</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "10px" }}>
                Hiç randevunuz bulunmamaktadır.
              </td>
            </tr>
          ) : (
            reservations.map((res) => (
              <tr key={res.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{res.id}</td>
                <td>{res.userFirstName || "Bilinmiyor"}</td>
                <td>{res.userLastName || "Bilinmiyor"}</td>
                <td>{res.appointmentDate}</td>
                <td>{res.appointmentTime}</td>
                <td>{res.userPhoneNumber || "Bilgi Yok"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
