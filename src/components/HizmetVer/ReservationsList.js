import React, { useState, useEffect } from "react";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const providerId = localStorage.getItem("userId");

  // Dinamik olarak providerId'yi alıyoruz
  useEffect(() => {
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
        setReservations(data); // Veriyi state'e kaydediyoruz
      })
      .catch((error) => {
        console.error("Hata:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [providerId]);

  const handleApprove = (appointmentId) => {
    setIsProcessing(true);

    fetch(`http://localhost:8080/api/appointments/${appointmentId}/approve`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Randevu onaylanamadı!");
        }
        return response.json();
      })
      .then((data) => {
        // Onaylanan randevuyu listeden kaldırıyoruz
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== appointmentId
          )
        );
      })
      .catch((error) => {
        console.error("Hata:", error);
        setIsProcessing(false);
      });
  };

  const handleReject = (appointmentId) => {
    setIsProcessing(true);

    fetch(`http://localhost:8080/api/appointments/${appointmentId}/reject`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Randevu reddedilemedi!");
        }
        return response.json();
      })
      .then((data) => {
        // Reddedilen randevuyu listeden kaldırıyoruz
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== appointmentId
          )
        );
      })
      .catch((error) => {
        console.error("Hata:", error);
        setIsProcessing(false);
      });
  };

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
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ padding: "10px" }}>
                Hiç bekleyen randevunuz bulunmamaktadır.
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
                  {res.status === "BEKLEMEDE" && (
                    <>
                      <button
                        onClick={() => handleApprove(res.id)}
                        disabled={isProcessing}
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          padding: "5px 10px",
                          margin: "0 5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => handleReject(res.id)}
                        disabled={isProcessing}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          padding: "5px 10px",
                          margin: "0 5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Reddet
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
