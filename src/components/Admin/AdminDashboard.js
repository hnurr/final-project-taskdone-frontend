import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("providers");
  const [pendingApprovals, setPendingApprovals] = useState([]); // Onay bekleyenler için state
  const [approvedProviders, setApprovedProviders] = useState([]); // Onaylı hizmet verenler için state
  const [loading, setLoading] = useState(false); // Yükleme durumunu takip etmek için

  useEffect(() => {
    if (activeSection === "pendingApprovals") {
      // Eğer aktif bölüm "Onay Bekleyenler" ise backend isteğini yap
      fetchPendingApprovals();
    } else if (activeSection === "providers") {
      // Eğer aktif bölüm "Hizmet Verenler" ise onaylı hizmet verenleri al
      fetchApprovedProviders();
    }
  }, [activeSection]);

  const fetchPendingApprovals = async () => {
    setLoading(true); // Yüklemeyi başlat
    try {
      const response = await fetch(
        "http://localhost:8080/admin/pending-approvals"
      ); // Backend URL'ini buraya koy
      if (!response.ok) {
        throw new Error("Veriler alınamadı!");
      }
      const data = await response.json();
      setPendingApprovals(data); // Gelen verileri state'e kaydet
    } catch (error) {
      console.error("Hata:", error.message);
    } finally {
      setLoading(false); // Yüklemeyi durdur
    }
  };

  const fetchApprovedProviders = async () => {
    setLoading(true); // Yüklemeyi başlat
    try {
      const response = await fetch(
        "http://localhost:8080/provider/approved-providers"
      ); // Backend URL'ini buraya koy
      if (!response.ok) {
        throw new Error("Veriler alınamadı!");
      }
      const data = await response.json();
      setApprovedProviders(data); // Gelen verileri state'e kaydet
    } catch (error) {
      console.error("Hata:", error.message);
    } finally {
      setLoading(false); // Yüklemeyi durdur
    }
  };

  const handleApprove = async (id) => {
    // Onaylama işlemi
    try {
      const response = await fetch(
        `http://localhost:8080/admin/approve/${id}`, // Onaylama işlemi için API çağrısı
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Onay işlemi başarısız!");
      }
      alert(`ID ${id} başarıyla onaylandı.`);
      fetchPendingApprovals(); // Listeyi tekrar al
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/reject/${id}`, // API çağrısı
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Reddetme işlemi başarısız!");
      }

      alert(`ID ${id} başarıyla reddedildi.`);

      // Backend işleminden sonra state'ten bu ID'yi kaldır
      setPendingApprovals((prevApprovals) =>
        prevApprovals.filter((approval) => approval.id !== id)
      );
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "providers":
        return (
          <div>
            <h3>Onaylı Hizmet Verenler</h3>
            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Adı</th>
                    <th>Soyadı</th>
                    <th>Email</th>
                    <th>İl</th>
                    <th>İlçe</th>
                    <th>Mahalle</th>
                    <th>Hizmet Alanı</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedProviders.map((provider) => (
                    <tr
                      key={provider.id}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td>{provider.name}</td>
                      <td>{provider.surname}</td>
                      <td>{provider.email}</td>
                      <td>{provider.city}</td>
                      <td>{provider.district}</td>
                      <td>{provider.neighborhood}</td>
                      <td>{provider.serviceArea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
            <h3
              style={{
                marginTop: "10px",
                marginBottom: "60px",
                padding: "5px 0",
              }}
            >
              Onay Bekleyenler
            </h3>
            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Adı</th>
                    <th>Soyadı</th>
                    <th>Email</th>
                    <th>İl</th>
                    <th>İlçe</th>
                    <th>Mahalle</th>
                    <th>Hizmet Alanı</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((approval) => (
                    <tr
                      key={approval.id}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td>{approval.name}</td>
                      <td>{approval.surname}</td>
                      <td>{approval.email}</td>
                      <td>{approval.city}</td>
                      <td>{approval.district}</td>
                      <td>{approval.neighborhood}</td>
                      <td>{approval.serviceArea}</td>

                      <td>
                        <span
                          style={{
                            backgroundColor:
                              approval.status === "Onaylandı"
                                ? "green"
                                : "white",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          {approval.status}
                        </span>
                      </td>
                      <td>
                        {approval.status !== "Onaylandı" ? (
                          <div>
                            <button
                              onClick={() => handleApprove(approval.id)}
                              style={{
                                padding: "5px 10px",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => handleReject(approval.id)}
                              style={{
                                padding: "5px 10px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                            >
                              Reddet
                            </button>
                          </div>
                        ) : (
                          <span>Onaylandı</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        return <div>Bölüm yüklenemedi.</div>;
    }
  };

  const handleLogout = () => {
    // Çıkış yapıldığında kullanıcıyı anasayfaya yönlendir
    window.location.href = "/"; // Burada anasayfaya yönlendirme yapılıyor
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
