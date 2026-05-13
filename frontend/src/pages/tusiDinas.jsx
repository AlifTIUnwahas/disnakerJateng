import React, { useState } from "react";
import { 
  ClipboardList, 
  Settings, 
  BarChart3
} from "lucide-react";

export const TusiDinas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const tusiData = {
    judul: "Tugas dan Fungsi Dinas Tenaga Kerja dan Transmigrasi Jawa Tengah",
    deskripsi: "Menyelenggarakan urusan pemerintahan bidang tenaga kerja dan bidang transmigrasi untuk membantu Gubernur dalam menyelenggarakan Pemerintahan Daerah.",
    poinUtama: [
      {
        kategori: "Perumusan Kebijakan",
        isi: "Perumusan Kebijakan bidang pelatihan kerja dan produktivitas, penempatan tenaga kerja dan transmigrasi, hubungan industrial dan jaminan sosial, serta pengawasan ketenagakerjaan.",
        icon: <ClipboardList size={24} />,
        color: "#1A5276"
      },
      {
        kategori: "Pelaksanaan Kebijakan",
        isi: "Pelaksanaan kebijakan di bidang pelatihan kerja dan produktivitas, penempatan tenaga kerja dan transmigrasi, hubungan industrial dan jaminan sosial, serta pengawasan ketenagakerjaan.",
        icon: <Settings size={24} />,
        color: "#1E8449"
      },
      {
        kategori: "Evaluasi & Pelaporan",
        isi: "Pelaksanaan evaluasi dan pelaporan bidang pelatihan kerja dan produktivitas, penempatan tenaga kerja dan transmigrasi, hubungan industrial dan jaminan sosial, serta pengawasan ketenagakerjaan.",
        icon: <BarChart3 size={24} />,
        color: "#D4AC0D"
      }
    ],
    fungsiLain: [
      "Pelaksanaan dan pembinaan administrasi kepada seluruh unit kerja di lingkungan Dinas.",
      "Pelaksanaan fungsi kedinasan lain yang diberikan oleh Gubernur sesuai tugas dan fungsinya."
    ]
  };

  const detailBidang = [
    { q: "Bidang Pelatihan & Produktivitas", a: "Fokus pada peningkatan skill tenaga kerja melalui BLK dan sertifikasi kompetensi." },
    { q: "Bidang Penempatan & Transmigrasi", a: "Mengelola bursa kerja (AK-1), penempatan tenaga kerja luar negeri, dan program transmigrasi." },
    { q: "Bidang Hubungan Industrial", a: "Menangani kesejahteraan pekerja, struktur skala upah, dan mediasi perselisihan industrial." },
    { q: "Bidang Pengawasan", a: "Memastikan perusahaan mematuhi norma K3 (Kesehatan dan Keselamatan Kerja) serta hak-hak normatif pekerja." },
  ];

  const s = {
    wrapper: {
      backgroundColor: "#F4F7F9",
      minHeight: "100vh",
      padding: "120px 20px 50px 20px",
      fontFamily: "'Source Sans 3', sans-serif",
      color: "#2C3E50",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    },
    heroCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      marginBottom: "30px",
      textAlign: "center",
      borderTop: "6px solid #1A5276"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "40px"
    },
    miniCard: {
      backgroundColor: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
      transition: "transform 0.2s",
      border: "1px solid #edf2f7"
    },
    iconBox: {
      width: "50px",
      height: "50px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      marginBottom: "15px"
    },
    footerCard: {
      backgroundColor: "#EBF5FB",
      padding: "25px",
      borderRadius: "12px",
      borderLeft: "6px solid #1A5276"
    },
    accordion: {
      backgroundColor: "#fff",
      border: "1px solid #E2E8F0",
      borderRadius: "10px",
      marginBottom: "12px",
      overflow: "hidden",
      transition: "all 0.3s ease"
    },
    accHeader: {
      padding: "18px 25px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "1.1rem",
      color: "#1A5276"
    },
    accBody: { 
      padding: "0 25px 20px 25px", 
      color: "#546E7A", 
      lineHeight: "1.6" 
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        {/* Logos */}
        <div style={s.headerLogos}>
          <img src="/img/jateng.png" alt="Jateng" style={{ height: "70px" }} />
          <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
          <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
        </div>

        {/* Hero Section */}
        <div style={s.heroCard}>
          <h1 style={{ fontSize: "2rem", marginBottom: "15px", color: "#1A5276" }}>{tusiData.judul}</h1>
          <p style={{ fontSize: "1.1rem", color: "#5D6D7E", maxWidth: "800px", margin: "0 auto" }}>
            {tusiData.deskripsi}
          </p>
        </div>

        {/* Interactive Grid for Core Tasks */}
        <div style={s.grid}>
          {tusiData.poinUtama.map((item, idx) => (
            <div key={idx} style={s.miniCard}>
              <div style={{ ...s.iconBox, backgroundColor: item.color, color: "#fff" }}>
                {item.icon}
              </div>
              <h3 style={{ marginBottom: "10px", color: item.color }}>{item.kategori}</h3>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#455A64" }}>{item.isi}</p>
            </div>
          ))}
        </div>

        {/* Support Functions */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", textAlign: "center" }}>Fungsi Penunjang & Administrasi</h2>
          <div style={s.footerCard}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {tusiData.fungsiLain.map((teks, i) => (
                <li key={i} style={{ display: "flex", gap: "15px", marginBottom: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "#1A5276", fontWeight: "bold" }}>●</span>
                  <span style={{ fontSize: "1.2rem" }}>{teks}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ Style - Bidang Detail */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Eksplorasi Bidang Kerja</h2>
          {detailBidang.map((item, i) => (
            <div key={i} style={s.accordion}>
              <div 
                style={{
                    ...s.accHeader, 
                    backgroundColor: openFaq === i ? "#F8FAFC" : "#fff"
                }} 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q} 
                <span style={{ transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                    {openFaq === i ? "▲" : "▼"}
                </span>
              </div>
              {openFaq === i && (
                <div style={s.accBody}>
                  <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", marginBottom: "15px" }} />
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};