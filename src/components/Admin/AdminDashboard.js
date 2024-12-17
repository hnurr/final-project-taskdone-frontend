import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import PendingApprovals from "./PendingApprovals";
import Providers from "./Providers";
import Customers from "./Customers";
import {
  fetchApprovedProviders,
  fetchPendingApprovals,
  fetchCustomers,
} from "./api";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("providers");
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      switch (activeSection) {
        case "providers":
          fetchApprovedProviders(setProviders, setLoading);
          break;
        case "pendingApprovals":
          fetchPendingApprovals(setApprovals, setLoading);
          break;
        case "customers":
          fetchCustomers(setCustomers, setLoading);
          break;
        default:
          break;
      }
    };

    fetchData(); // Verileri çekme işlemi burada tetikleniyor
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "providers":
        return <Providers setLoading={setLoading} providers={providers} />; // setLoading'i doğru şekilde geçiyoruz
      case "customers":
        return <Customers loading={loading} customers={customers} />;
      case "pendingApprovals":
        return <PendingApprovals loading={loading} approvals={approvals} />;
      default:
        return <div>Bölüm yüklenemedi.</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          backgroundColor: "#ecf0f1",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <Header />
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
