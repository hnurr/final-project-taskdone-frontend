import React, { useEffect, useState } from "react";

const CompletedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tamamlanmış randevuları alıyoruz
    fetch("http://localhost:8080/api/appointments/completed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veriler alınamadı!");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Tamamlanmış Randevular
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
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "10px" }}>
                Hiç tamamlanmış randevunuz bulunmamaktadır.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr
                key={appointment.id}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <td>{appointment.id}</td>
                <td>{appointment.userFirstName || "Bilinmiyor"}</td>
                <td>{appointment.userLastName || "Bilinmiyor"}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.userPhoneNumber || "Bilgi Yok"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedAppointments;
