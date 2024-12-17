import React, { useState } from "react";

const PendingApprovals = ({ loading, approvals, setApprovals }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Sayfayı yenileyen metot
  const forceRefresh = () => {
    window.location.reload();
  };

  const handleApprove = (id) => {
    setIsProcessing(true);

    // Onay işlemi yapılacak
    fetch(`http://localhost:8080/admin/approve/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        forceRefresh(); // Sayfayı yenileyen fonksiyonu çağırıyoruz
      })
      .catch((error) => {
        console.error("Onaylama işlemi başarısız:", error);
        setIsProcessing(false);
      });
  };

  const handleReject = (id) => {
    setIsProcessing(true);

    // Reddetme işlemi yapılacak
    fetch(`http://localhost:8080/admin/reject/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        forceRefresh(); // Sayfayı yenileyen fonksiyonu çağırıyoruz
      })
      .catch((error) => {
        console.error("Reddetme işlemi başarısız:", error);
        setIsProcessing(false);
      });
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!approvals || approvals.length === 0) {
    return <div>Hiç bekleyen onay bulunamadı.</div>;
  }

  return (
    <div>
      <h2>Bekleyen Onaylar</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Adı
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Soyadı
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              İl
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              İlçe
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Mahalle
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Hizmet Verilen Alan
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval) => (
            <tr key={approval.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.name || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.surname || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.email || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.city || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.district || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.neigborhood || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {approval.serviceArea || "Bilgi Yok"}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => handleApprove(approval.id)}
                  disabled={isProcessing}
                  style={{
                    padding: "5px 10px",
                    marginRight: "5px",
                    cursor: "pointer",
                    backgroundColor: "green",
                  }}
                >
                  Onayla
                </button>
                <button
                  onClick={() => handleReject(approval.id)}
                  disabled={isProcessing}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Reddet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApprovals;
