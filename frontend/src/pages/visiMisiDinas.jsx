import React, { useState } from "react";

export const VisiDinas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const profilData = {
    singkatan: "Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah",
    alamat: "Jl. Pahlawan No. 16, Semarang, Jawa Tengah 50241",
    telepon: "(024) 8311713 / (024) 8311711",
    email: "disnakertrans@jatengprov.go.id",
    jamOperasional: "Senin – Jumat: 07.30 – 15.30 WIB",
    kepalaKantor: "Ahmad Aziz, S.E., M.Si.",
    visi: "Jawa Tengah Yang Mandiri, Maju, Sejahtera dan Lestari.",
    misi: [
      "Mewujudkan sumber daya manusia masyarakat Jawa Tengah yang berkualitas dan berbudaya.",
      "Mewujudkan perekonomian daerah yang berbasis pada potensi unggulan daerah.",
      "Mewujudkan tata pemerintahan yang baik dan profesional.",
      "Mewujudkan pengelolaan sumber daya alam yang optimal.",
      "Mewujudkan sarana prasarana yang menunjang pelayanan dasar.",
      "Mewujudkan masyarakat yang sejahtera, aman, dan damai.",
    ],
  };

  const faqs = [
    { q: "Bagaimana cara mendaftar pelatihan kerja?", a: "Pendaftaran dapat dilakukan melalui BLK terdekat atau portal resmi." },
    { q: "Apa itu program transmigrasi?", a: "Program perpindahan penduduk untuk pemerataan kesejahteraan." },
    { q: "Cara lapor pelanggaran?", a: "Laporan melalui email resmi atau datang langsung ke bidang pengawasan." },
  ];

  const s = {
    wrapper: {
      backgroundColor: "#F0F4F8",
      minHeight: "100vh",
      padding: "150px 20px 50px 20px", // mt: 8 + py: 6
      fontFamily: "'Source Sans 3', sans-serif",
      color: "#1C2833",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
    },
    mainCol: { flex: "2 1 600px" },
    sideCol: { flex: "1 1 350px" },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      marginBottom: "25px",
    },
    header: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" },
    iconCircle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "1.2rem",
    },
    h2: { margin: 0, fontSize: "1.5rem", fontWeight: "700" },
    alert: {
      backgroundColor: "#E3F2FD",
      padding: "20px",
      borderRadius: "8px",
      fontStyle: "italic",
      borderLeft: "5px solid #1A5276",
      color: "#1A5276",
      lineHeight: "1.6",
    },
    divider: { border: "none", borderTop: "1px solid #eee", margin: "25px 0" },
    list: { listStyle: "none", padding: 0 },
    listItem: { display: "flex", gap: "12px", marginBottom: "15px", lineHeight: "1.5" },
    infoRow: { display: "flex", gap: "15px", marginBottom: "20px" },
    label: { fontSize: "0.85rem", color: "#5D6D7E", display: "block" },
    value: { fontWeight: "600", fontSize: "1rem" },
    accordion: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "10px",
      overflow: "hidden",
    },
    accHeader: {
      padding: "15px 20px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "600",
    },
    accBody: { padding: "0 20px 15px 20px", color: "#5D6D7E", fontSize: "0.95rem" },
  };

  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        
        <div style={s.mainCol}>
          <div style={s.card}>
            <div style={s.header}>
              <div style={{ ...s.iconCircle, backgroundColor: "#1A5276" }}>⭐</div>
              <h2 style={s.h2}>Visi</h2>
            </div>
            <div style={s.alert}>"{profilData.visi}"</div>

            <hr style={s.divider} />

            <div style={s.header}>
              <div style={{ ...s.iconCircle, backgroundColor: "#1E8449" }}>📈</div>
              <h2 style={s.h2}>Misi</h2>
            </div>
            <ul style={s.list}>
              {profilData.misi.map((m, i) => (
                <li key={i} style={s.listItem}>
                  <span style={{ color: "#1E8449" }}>✔</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={s.sideCol}>
          <div style={s.card}>
            <h2 style={{ ...s.h2, marginBottom: "20px" }}>Informasi Kantor</h2>
            {[
              { icon: "🏢", label: "Instansi", val: profilData.singkatan },
              { icon: "👤", label: "Kepala", val: profilData.kepalaKantor },
              { icon: "📍", label: "Alamat", val: profilData.alamat },
              { icon: "📞", label: "Telepon", val: profilData.telepon },
              { icon: "📧", label: "Email", val: profilData.email },
            ].map((item, i) => (
              <div key={i} style={s.infoRow}>
                <span>{item.icon}</span>
                <div>
                  <span style={s.label}>{item.label}</span>
                  <span style={s.value}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ ...s.h2, margin: "30px 0 15px" }}>FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={s.accordion}>
              <div style={s.accHeader} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q} <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div style={s.accBody}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
