// Onaylı sağlayıcıları çekmek için API çağrısı
export const fetchApprovedProviders = async (setProviders, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(
      "http://localhost:8080/provider/approved-providers"
    );
    if (!response.ok) {
      throw new Error("Onaylı sağlayıcılar alınamadı.");
    }
    const data = await response.json();
    setProviders(data);
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    setLoading(false);
  }
};

// Bekleyen onayları çekmek için API çağrısı
export const fetchPendingApprovals = async (setApprovals, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(
      "http://localhost:8080/admin/pending-approvals"
    );
    if (!response.ok) {
      throw new Error("Bekleyen onaylar alınamadı.");
    }
    const data = await response.json();
    setApprovals(data);
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    setLoading(false);
  }
};

// Müşteri verilerini çekmek için API çağrısı
export const fetchCustomers = async (setCustomers, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/customer");
    if (!response.ok) {
      throw new Error("Müşteri verileri alınamadı.");
    }
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    setLoading(false);
  }
};

// Sağlayıcıyı onaylama
export const approveProvider = async (id) => {
  await fetch(`http://localhost:8080/admin/approve/${id}`, { method: "POST" });
};

// Sağlayıcıyı reddetme
export const rejectProvider = async (id) => {
  await fetch(`http://localhost:8080/admin/reject/${id}`, { method: "POST" });
};
