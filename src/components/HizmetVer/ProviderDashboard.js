import React, { useState, onSave } from "react";
import CreateProfile from "./CreateProfile.js";

const ProviderDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const userName = "Ahmet Yılmaz"; // Bu, örnek bir kullanıcı adı. Gerçek projede bu kullanıcı veritabanından veya global state'ten alınabilir.

  // onSave fonksiyonunu burada tanımlıyoruz
  const onSave = (updatedData) => {
    console.log("Updated Data:", updatedData);
    // Veriyi kaydetme işlemi burada yapılabilir.
    alert("Profil güncellenmiştir.");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <CreateProfile onSave={onSave} /> // onSave fonksiyonunu CreateProfile bileşenine geçiriyoruz
        );
      case "reservations":
        return (
          <div>
            <h3>Aktif Randevularım</h3>
          </div>
        );
      case "payments":
        return (
          <div>
            <h3>Geçmiş Hizmetlerim</h3>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h3>Bekleyen Onaylar</h3>
          </div>
        );
      case "services":
        return (
          <div>
            <h3>Reddedilen Hizmetler</h3>
          </div>
        );
      default:
        return <div>Bölüm yüklenemedi.</div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <nav
        style={{
          width: "250px",
          backgroundColor: "#2c3e50",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Hizmet Paneli
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            { name: "Profil", key: "profile" },
            { name: "Rezervasyonlar", key: "reservations" },
            { name: "Ödemeler", key: "payments" },
            { name: "Bildirimler", key: "notifications" },
            { name: "Hizmetlerim", key: "services" },
            { name: "Takvim", key: "calendar" },
          ].map((section) => (
            <li
              key={section.key}
              style={{
                padding: "15px 10px",
                cursor: "pointer",
                backgroundColor:
                  activeSection === section.key ? "#34495e" : "inherit",
                marginBottom: "5px",
                borderRadius: "5px",
              }}
              onClick={() => setActiveSection(section.key)}
            >
              {section.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          backgroundColor: "#ecf0f1",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* Header with Logout Button */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "green",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ margin: 0, color: "white" }}>Hoşgeldiniz</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Logout Button */}
            <button
              onClick={() => alert("Çıkış yapılıyor...")}
              style={{
                padding: "10px",
                backgroundColor: "white",
                color: "green",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </header>

        {/* Section Content */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
