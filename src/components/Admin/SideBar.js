import React from "react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
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
          { name: "Randevu Takvimleri", key: "reports" },
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
  );
};

export default Sidebar;
