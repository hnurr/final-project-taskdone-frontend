import React from "react";

const Header = () => {
  const handleLogout = () => {
    window.location.href = "/"; // Burada anasayfaya yönlendirme yapılıyor
  };

  return (
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
      <h1 style={{ margin: 0, color: "white" }}>Hoşgeldiniz Admin</h1>
      <button
        onClick={handleLogout}
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
  );
};

export default Header;
