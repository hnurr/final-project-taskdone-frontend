import React, { useState, useEffect } from "react";
import { fetchApprovedProviders } from "./api"; // api fonksiyonlarını doğru import ettiğinizden emin olun

const Providers = ({ setLoading }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setLoading(true); // Yükleniyor durumuna geçiriyoruz
    fetchApprovedProviders(setProviders, () => setLoading(false)); // Veriyi çekerken setLoading'i kullanıyoruz
  }, [setLoading]);

  return (
    <div>
      <h2>Hizmet Verenler</h2>
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
              Email
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
              Telefon Numarası
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              City
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
              Hizmet Alanı
            </th>
          </tr>
        </thead>
        <tbody>
          {providers.map((providers) => (
            <tr key={providers.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.email}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.name || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.surname || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.phoneNumber || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.city}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.district}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.neighborhood}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {providers.serviceArea}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Providers;
