import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProfile = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    /*address: "",*/
    description: "",
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    // Eğer userId varsa, mevcut kullanıcı bilgilerini çekiyoruz
    if (userId) {
      axios
        .get(`https://localhost:8080/users/${userId}`)
        .then((response) => {
          setFormData(response.data); // Kullanıcı bilgilerini formData'ya yüklüyoruz
        })
        .catch((error) => {
          console.error("Kullanıcı bilgileri yüklenirken hata oluştu", error);
        });
    }
  }, []); // Bu efekt sadece ilk renderda çalışacak

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const userId = sessionStorage.getItem("id");
    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId); // Konsola ID'yi yazdırarak kontrol edin

    if (!userId) {
      alert("Kullanıcı ID'si bulunamadı! Lütfen giriş yapın.");
      return;
    }

    try {
      const updatedData = { ...formData, userId };

      const response = await axios.put(
        `http://localhost:8080/users/update/${userId}`,
        updatedData
      );

      if (response.status === 200) {
        setFormData(updatedData); // Formu güncel bilgilerle doldur
        onSave(updatedData);
        alert("Bilgiler başarıyla güncellendi!");
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Profil Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          {/* Sol Sütun */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                İl
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Semt
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>

          {/* Sağ Sütun */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Telefon Numarası
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "95%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                İlçe
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                style={{
                  width: "95%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Açıklama
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              resize: "none",
              height: "80px",
            }}
          ></textarea>
        </div>

        {/* Kaydet Butonu */}
        <button
          type="submit"
          style={{
            width: "50%",
            padding: "12px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
