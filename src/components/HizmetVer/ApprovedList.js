import React, { useEffect, useState } from "react";

const ApprovedList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const providerId = localStorage.getItem("userId"); // Dinamik olarak ID al

    if (!providerId) {
      console.error("User ID bulunamadı!");
      setLoading(false);
      return;
    }

    // Onaylı randevuları alıyoruz
    fetch(`http://localhost:8080/api/appointments/approved`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veriler alınamadı!");
        }
        return response.json();
      })
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Sadece component mount olduğunda çalışır

  const handleComplete = (id) => {
    fetch(`http://localhost:8080/api/appointments/complete/${id}`, {
      method: "PUT", // Durum değiştirme için PUT isteği kullanıyoruz
    })
      .then((response) => response.json())
      .then((data) => {
        // Güncellenen randevuyu bulup, listeyi yeniden güncelliyoruz
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id
              ? { ...reservation, status: "TAMAMLANDI" }
              : reservation
          )
        );
      })
      .catch((error) => {
        console.error("Randevu tamamlanamadı:", error);
      });
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Onaylı Randevular
      </h2>
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
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ padding: "10px" }}>
                Hiç onaylı randevunuz bulunmamaktadır.
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
                <td>
                  {/* Tamamla butonu */}
                  <button
                    onClick={() => handleComplete(res.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Tamamla
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedList;
