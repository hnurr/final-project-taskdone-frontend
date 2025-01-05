import React, { useState, useEffect } from "react";

const AppointmentPage = ({ providerId, onClose }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  useEffect(() => {
    // Burada providerId'ye bağlı takvimi çekmek için bir API çağrısı yapılabilir.
    fetch(`http://localhost:8080/api/appointments/${providerId}`)
      .then((response) => response.json())
      .then((data) => setAvailableDates(data))
      .catch((error) =>
        console.error("Takvim verisi alınırken hata oluştu", error)
      );
  }, [providerId]);

  const handleAppointmentSubmit = () => {
    // Randevu oluşturulması için API çağrısı
    fetch(`http://localhost:8080/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        providerId,
        appointmentDate: selectedDate,
        ...appointmentDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Randevu oluşturuldu!");
        onClose(); // Randevu oluşturulduktan sonra pencereyi kapat
      })
      .catch((error) =>
        console.error("Randevu oluşturulurken hata oluştu", error)
      );
  };

  return (
    <div style={appointmentPageStyle}>
      <h2>Randevu Al</h2>
      <div>
        <label>Randevu Tarihini Seçin:</label>
        <select
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
        >
          <option value="">Tarih Seçin</option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Adınız:</label>
        <input
          type="text"
          onChange={(e) =>
            setAppointmentDetails({
              ...appointmentDetails,
              name: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Telefon:</label>
        <input
          type="text"
          onChange={(e) =>
            setAppointmentDetails({
              ...appointmentDetails,
              phone: e.target.value,
            })
          }
        />
      </div>

      <button style={buttonStyle} onClick={handleAppointmentSubmit}>
        Randevu Oluştur
      </button>
      <button style={cancelButtonStyle} onClick={onClose}>
        İptal Et
      </button>
    </div>
  );
};

const appointmentPageStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  margin: "auto",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  cursor: "pointer",
  marginTop: "10px",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  cursor: "pointer",
  marginTop: "10px",
  marginLeft: "10px",
};

export default AppointmentPage;
