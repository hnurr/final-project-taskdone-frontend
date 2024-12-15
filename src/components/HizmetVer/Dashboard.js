import React from "react";
import "./Dashboard.css";

// Ana Dashboard Componenti
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
};

// Header Componenti
const Header = () => {
  return (
    <header className="header">
      <div className="logo">Hizmet Veren Dashboard</div>
      <div className="header-actions">
        <button className="notification-btn">🔔 Bildirimler</button>
        <button className="messages-btn">✉️ Mesajlar</button>
        <div className="profile-menu">Profil</div>
      </div>
    </header>
  );
};

// Sidebar Componenti
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <a href="#">Ana Sayfa</a>
        </li>
        <li>
          <a href="#">Yeni Talepler</a>
        </li>
        <li>
          <a href="#">Hizmetlerim</a>
        </li>
        <li>
          <a href="#">Takvim</a>
        </li>
        <li>
          <a href="#">Gelirlerim</a>
        </li>
        <li>
          <a href="#">Yorumlar ve Puanlar</a>
        </li>
        <li>
          <a href="#">Destek</a>
        </li>
      </ul>
    </nav>
  );
};

// Ana İçerik Componenti
const MainContent = () => {
  return (
    <div className="main-content">
      <h1>Hoşgeldiniz!</h1>
      <p>Bugün harika bir gün, 3 yeni talebiniz var.</p>
      <div className="stats">
        <div className="stat-box">
          <h3>Kazançlar</h3>
          <p>₺1500</p>
        </div>
        <div className="stat-box">
          <h3>Rezervasyonlar</h3>
          <p>2 Aktif</p>
        </div>
        <div className="stat-box">
          <h3>Ortalama Puan</h3>
          <p>4.8/5</p>
        </div>
      </div>
      <div className="calendar">
        <h2>Takvim</h2>
        <p>Bugün planlanmış 1 hizmetiniz var.</p>
      </div>
    </div>
  );
};

export default Dashboard;
