import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function UseFiyatVerisi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/data/sahte_yikama_verisi_final.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        setData(results.data);
      },
      error: (err) => {
        console.error("PapaParse hatası:", err);
      },
    });
  }, []);

  return data;
}
