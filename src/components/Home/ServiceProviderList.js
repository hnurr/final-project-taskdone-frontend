import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ServiceProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedServiceArea, setSelectedServiceArea] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isDateSelectionStep, setIsDateSelectionStep] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/users/service-providers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched providers:", data); // Burada objelerin id'si var mı?
        setProviders(data);
        setFilteredProviders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekilirken bir hata oluştu:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = () => {
    setFilteredProviders(
      providers.filter((provider) => {
        return (
          (selectedCity ? provider.city === selectedCity : true) &&
          (selectedDistrict ? provider.district === selectedDistrict : true) &&
          (selectedServiceArea
            ? provider.serviceArea === selectedServiceArea
            : true)
        );
      })
    );
  };

  const openModal = (provider) => {
    if (userId == null) {
      //console.log("Randevu alabilmek için giriş yapınız");
      alert("Randevu alabilmek için giriş yapınız");
      navigate("/login");
      return;
    }
    console.log("Selected provider: ", provider); // Burada id var mı?
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAppointmentModalOpen(false);
    setIsCommentModalOpen(false);
    setIsDateSelectionStep(false);
  };

  const openCommentsModal = () => {
    fetch(`http://localhost:8080/appointments/comments/${selectedProvider.id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setIsCommentModalOpen(true);
      })
      .catch((error) => {
        console.error("Yorumlar alınırken bir hata oluştu:", error);
      });
  };

  const handleNextStep = () => {
    setIsDateSelectionStep(true);
  };

  const handleAppointment = () => {
    if (!selectedProvider || !selectedProvider.id) {
      console.error("Selected provider ya da id eksik:", selectedProvider);
      alert("Hata: Seçilen sağlayıcı bilgisi eksik. Lütfen tekrar deneyin.");
      return;
    }

    const appointmentData = {
      userId: userId,
      providerId: selectedProvider.id,
      appointmentDate: appointmentDate,
      userFirstName: name,
      userLastName: surname,
      userPhoneNumber: phone,
    };

    console.log("Appointment Data:", appointmentData);

    fetch("http://localhost:8080/api/appointments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        if (data.message) {
          alert(data.message);
          return;
        }
        alert("Randevunuz başarıyla alındı.");
        closeModal();
      });
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    width: "100%",
    gap: "15px",
  };

  const imageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "10px",
  };

  const selectStyle = {
    fontSize: "18px",
    padding: "10px",
    marginRight: "10px",
    width: "200px",
  };

  const ratingStyle = {
    color: "#ffd700",
    fontSize: "18px",
    marginBottom: "10px",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <h1 style={{ textAlign: "center" }}>Hizmet Verenler</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <select
          style={selectStyle}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Şehir</option>
          {providers
            .map((provider) => provider.city)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        <select
          style={selectStyle}
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">İlçe</option>
          {providers
            .map((provider) => provider.district)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>

        <select
          style={selectStyle}
          value={selectedServiceArea}
          onChange={(e) => setSelectedServiceArea(e.target.value)}
        >
          <option value="">Kategori</option>
          {providers
            .map((provider) => provider.serviceArea)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <button
          style={{
            ...buttonStyle,
            marginLeft: "10px",
          }}
          onClick={handleFilterChange}
        >
          Filter
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {filteredProviders.map((provider) => (
          <div key={provider.id} style={cardStyle}>
            <img
              src="https://via.placeholder.com/80"
              alt={`${provider.name} ${provider.surname}`}
              style={imageStyle}
            />
            <div>
              <h2>
                {provider.name} {provider.surname}
              </h2>
              <p>
                <strong>Şehir:</strong> {provider.city}
              </p>
              <p>
                <strong>İlçe:</strong> {provider.district}
              </p>
              <p>
                <strong>Mahalle:</strong>{" "}
                {provider.neighborhood ? provider.neighborhood : "N/A"}
              </p>
              <p>
                <strong>Açıklama:</strong> {provider.description}
              </p>
              {provider.companyName && (
                <p>
                  <strong>Şirket:</strong> {provider.companyName}
                </p>
              )}
              <p>
                <strong>Telefon:</strong> {provider.phoneNumber}
              </p>
              <p>
                <strong>Kategori:</strong> {provider.serviceArea}
              </p>

              <div style={ratingStyle}>★★★★☆</div>

              <button
                style={{
                  ...buttonStyle,
                  marginBottom: "20px",
                }}
                onClick={() => openModal(provider)}
              >
                Randevu Al
              </button>

              <button
                style={{
                  ...buttonStyle,
                  marginBottom: "20px",
                  backgroundColor: "#007bff",
                }}
                onClick={openCommentsModal}
              >
                Yorumlar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Randevu Alma Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <h3>Randevu Al</h3>
            {!isDateSelectionStep ? (
              <>
                <label>Ad:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınızı girin"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                />
                <label>Soyad:</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Soyadınızı girin"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                />
                <label>Telefon No:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranızı girin"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                />
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#007bff",
                    width: "100%",
                  }}
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <label>Tarih ve Saat:</label>
                <DatePicker
                  selected={appointmentDate}
                  onChange={(date) => setAppointmentDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  timeIntervals={30}
                  minDate={new Date()}
                  placeholderText="Tarih ve saat seçin"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                />
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#28a745",
                    width: "100%",
                  }}
                  onClick={handleAppointment}
                >
                  Randevu Al
                </button>
              </>
            )}

            <button
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
                marginTop: "20px",
                width: "100%",
              }}
              onClick={closeModal}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Yorumlar Modal */}
      {isCommentModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <h3>Yorumlar</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
                marginTop: "20px",
                width: "100%",
              }}
              onClick={closeModal}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderList;
