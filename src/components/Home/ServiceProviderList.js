import React, { useState, useEffect } from "react";

const ServiceProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedServiceArea, setSelectedServiceArea] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/users/service-providers") // API URL'sini değiştirin
      .then((response) => {
        if (!response.ok) {
          throw new Error("API isteği başarısız oldu");
        }
        return response.json();
      })
      .then((data) => {
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

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column", // Kartları dikey hizalama
    alignItems: "center", // Kart içeriğini ortalamak için
    maxWidth: "400px", // Kart genişliğini sınırlama
    width: "100%", // Kart genişliği ekran boyutuna göre ayarlansın
    gap: "15px", // Kart içindeki içerik arasında boşluk ekledik
  };

  const imageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "20px", // Fotoğraf ve diğer içerik arasına boşluk ekledik
  };

  const buttonStyle = {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    marginTop: "10px", // Buton ile diğer içerik arasına boşluk ekledik
  };

  const selectStyle = {
    fontSize: "18px",
    padding: "10px",
    marginRight: "10px",
    width: "200px",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <h1 style={{ textAlign: "center" }}>Service Providers</h1>
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
          <option value="">Select City</option>
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
          <option value="">Select District</option>
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
          <option value="">Select Category</option>
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
          justifyContent: "center", // Kartları ortalamak için
          gap: "20px", // Kartlar arasında boşluk ekliyoruz
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
                <strong>City:</strong> {provider.city}
              </p>
              <p>
                <strong>District:</strong> {provider.district}
              </p>
              <p>
                <strong>Neighborhood:</strong>{" "}
                {provider.neighborhood ? provider.neighborhood : "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {provider.description}
              </p>
              {provider.companyName && (
                <p>
                  <strong>Company:</strong> {provider.companyName}
                </p>
              )}
              <p>
                <strong>Phone:</strong> {provider.phoneNumber}
              </p>
              <p>
                <strong>Category:</strong> {provider.serviceArea}
              </p>
            </div>
            <button style={buttonStyle}>Randevu Al</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderList;
