import React, { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("providers");

  const renderSection = () => {
    switch (activeSection) {
      case "providers":
        return (
          <div>
            <h3>Hizmet Verenler</h3>
            <p>Burada hizmet verenlerin listesi bulunacak.</p>
          </div>
        );
      case "customers":
        return (
          <div>
            <h3>Müşteriler</h3>
            <p>Burada müşterilerin listesi bulunacak.</p>
          </div>
        );
      case "pendingApprovals":
        return (
          <div>
            <h3>Onay Bekleyenler</h3>
            <p>Burada onay bekleyen kayıtlar veya işlemler listelenecek.</p>
          </div>
        );
      case "reports":
        return (
          <div>
            <h3>Raporlar</h3>
            <p>Burada sistemle ilgili raporlar görüntülenecek.</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h3>Ayarlar</h3>
            <p>Burada sistem ayarları yönetilecek.</p>
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
          Admin Paneli
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            { name: "Hizmet Verenler", key: "providers" },
            { name: "Müşteriler", key: "customers" },
            { name: "Onay Bekleyenler", key: "pendingApprovals" },
            { name: "Raporlar", key: "reports" },
            { name: "Ayarlar", key: "settings" },
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
            backgroundColor: "#2980b9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ margin: 0, color: "white" }}>Hoşgeldiniz Admin</h1>
          <button
            onClick={() => alert("Çıkış yapılıyor...")}
            style={{
              padding: "10px",
              backgroundColor: "white",
              color: "#2980b9",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Çıkış Yap
          </button>
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

export default AdminDashboard;
