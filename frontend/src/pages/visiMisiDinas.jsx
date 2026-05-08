import React, { useState } from "react";
import { 
  BarChart3,
  Star
} from "lucide-react";

export const VisiDinas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const profilData = {
    visi: "Jawa Tengah Sebagai Provinsi Maju Yang Berkelanjutan Untuk Menuju Indonesia Emas 2045.",
    misi: [
      "Meningkatkan Layanan Dasar yang Inklusif untuk mewujudkan Sumber Daya Manusia yang Mandiri, Kompetitif dan Berwawasan Global.",
      "Meningkatkan Pertumbuhan Perekonomian Perkotaan dan Pedesaan Berbasis Sektor Unggulan yang Inovatif, Mandiri dan berkelanjutan.",
      "Mewujudkan Tata Kelola Pemerintahan yang Responsif dan Kolaboratif dengan mengedepankan nilai-nilai Integritas.",
      "Mewujudkan Pembangunan Infrastruktur Jawa Tengah yang merata dan berkeadilan, melalui perencanaan tata ruang yang responsif.",
      "Menjaga Stabilitas dan Kondusivitas Daerah dengan pendekatan budaya lokal, serta menjamin kebebasan warga dalam menjalankan ibadah, perlindungan kesejahteraan sosial serta hak asasi manusia yang berkeadilan",
      "Menjaga iklim Investasi yang kondusif dan kolaboratif untuk membuka kesempatan kerja dan berusaha seluas-luasnya bagi warga Jawa Tengah. Serta Mengembangkan pembiayaan Pembangunan yang partisipatif, kolaboratif dan terintegrasi.",
    ],
    programPrioritas: [
      "Melahirkan Pemerintahan yang Good Clear Government dan Collaborative Governance melalui peningkatan kesejahteraan, Profesionalitas dan kualitas ASN dan Perangkat Desa.",
      "Melahirkan ekosistem ekonomi syariah melalui penguatan regulasi dan pengembangan wisata ramah muslim.",
      "Pupuk mudah bagi petani, subsidi solar bagi nelayan dan ketersediaan day care untuk buruh di Kawasan industri.",
      "Taruna mandiri melalui program kartu zilenial untuk membuka lapangan kerja.",
      "Moderasi Beragama dan wawasan kebangsaan melalui penguatan regulasi, pendidikan dan pelatihan.",
      "Pesantren Obah melalui Penambahan Dana Pengembangan Pesantren.",
      "Pelayanan kesehatan yang paripurna melalui asuransi kesehatan gratis bagi warga miskin.",
      "Pendidikan yang berkualitas dan merata melalui peningkatan kesejahteraan guru, pengajar agama dan beasiswa untuk siswa miskin, Guru, Santri, penghafal Quran, untuk sekolah ke dalam dan luar negeri bagi yang berprestasi.",
      "Desa maju dan berdaya melalui pembangunan lumbung kesejahteraan, produk unggulan go unternasional, Sistem Informasi Desa (SID), dan Tim Tanggap Bencana.",
      "Pembangunan Infrastruktur melalui Permukiman Layak Huni melalui 1 KK 1 ruamh layak huni, Pengembangan Pusat Rekreasi dan Promosi Pembangunan, dan Gelanggang Olah Raga Internasional.",
      "Penanggulangan Bencana dan keberlanjutan Lingkungan melalui Mageri Segoro untuk mengamankan garis pantai.",
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
    headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    },
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
    label: { fontSize: "1.2rem", color: "#5D6D7E", display: "block" },
    value: { fontWeight: "600", fontSize: "1.2rem" },
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
    accBody: { padding: "0 20px 15px 20px", color: "#5D6D7E", fontSize: "1.2rem" },
  };

  return (
    
    <div style={s.wrapper}>
      <div style={s.headerLogos}>
          <img src="/img/jateng.png" alt="Jateng" style={{ height: "70px" }} />
          <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
          <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
        </div> 
      <div style={s.container}> 
        <div style={s.mainCol}>
          <div style={s.card}>
            <div style={s.header}>
              <div style={{ ...s.iconCircle, backgroundColor: "#1A5276" }}><Star size={24} color="#FFD700" fill="#FFD700" /></div>
              <h2 style={s.h2}>Visi</h2>
            </div>
            <div style={s.alert}>"{profilData.visi}"</div>

            <hr style={s.divider} />

            <div style={s.header}>
              <div style={{ ...s.iconCircle, backgroundColor: "#1E8449" }}><BarChart3 size={24} /></div>
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
            <h2 style={{ ...s.h2, marginBottom: "20px" }}>Program Prioritas</h2>
            <ul style={s.list}>
              {profilData.programPrioritas.map((m, i) => (
                <li key={i} style={s.listItem}>
                  <span style={{ color: "#1E8449" }}>✔</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <h2 style={{ ...s.h2, margin: "10px 0 15px" }}>FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={s.accordion}>
              <div style={s.accHeader} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q} <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div style={s.accBody}>{f.a}</div>}
            </div>
          ))}
    </div>
    
  );
};
