import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/GirisYap/Login";
import HizmetVer from "./components/HizmetVer/HizmetVer";
import ProviderDashboard from "./components/HizmetVer/ProviderDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ServicesPage from "./components/Service/ServicesPage";
import CleaningServicesPage from "./components/Service/CleaningServicesPage";
import RenovationServicesPage from "./components/Service/RenovationServicesPage";
import RepairServicesPage from "./components/Service/RepairServicesPage";
import OrganizationServicesPage from "./components/Service/OrganizationServicesPage";
import HealthServicesPage from "./components/Service/HealthServicesPage";
import TransportServicesPage from "./components/Service/TransportServicesPage";
import CreateProfile from "./components/HizmetVer/CreateProfile.js";
import ServiceRequestForm from "./components/Service/ServiceRequestForm";
import ServiceProviderList from "./components/Home/ServiceProviderList.js";
import AppointmentsPage from "./components/Navbar/AppointmentsPage.js"; // Randevu sayfanı içe aktar
import HaliYikamaForm from "./components/Service/HaliYikamaForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Kullanıcı giriş yapmışsa state'i güncelle
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} updateLoginStatus={updateLoginStatus} />{" "}
        {/* Navbar'a props ile gönder */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<Login updateLoginStatus={updateLoginStatus} />}
          />{" "}
          {/* Login'e props ile gönder */}
          <Route path="/hizmet-ver" element={<HizmetVer />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/services/1" element={<CleaningServicesPage />} />
          <Route path="/services/2" element={<RenovationServicesPage />} />
          <Route path="/services/3" element={<RepairServicesPage />} />
          <Route path="/services/4" element={<OrganizationServicesPage />} />
          <Route path="/services/5" element={<HealthServicesPage />} />
          <Route path="/services/6" element={<TransportServicesPage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/service-request" element={<ServiceRequestForm />} />
          <Route
            path="/service-provider-all"
            element={<ServiceProviderList />}
          />
          <Route path="/appointments/:userId" element={<AppointmentsPage />} />
          <Route path="/hali-yikama" element={<HaliYikamaForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
