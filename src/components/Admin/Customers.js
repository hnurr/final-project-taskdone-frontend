import React from "react";

const Customers = ({ loading, customers }) => {
  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!customers || customers.length === 0) {
    return <div>Hiç müşteri bulunamadı.</div>;
  }

  return (
    <div>
      <h2>Müşteriler</h2>
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
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.email}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.name || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.surname || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.phoneNumber || "Bilgi Yok"}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {customer.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
