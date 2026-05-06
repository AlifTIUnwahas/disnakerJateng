import React, { useState } from "react";
import { Book, Briefcase, Users, Home, ShieldCheck, ChevronRight } from 'lucide-react';

export const ProfilDinas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const profilData = {
    singkatan: "Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah",
    alamat: "Jl. Pahlawan No. 16, Semarang, Jawa Tengah 50241",
    telepon: "(024) 8311713 / (024) 8311711",
    email: "disnakertrans@jatengprov.go.id",
    jamOperasional: "Senin – Jumat: 07.30 – 15.30 WIB",
    kepalaKantor: "Ahmad Aziz, S.E., M.Si.",
  };

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
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '100px',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: "'Inter', sans-serif",
      lineHeight: '1.6',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
      paddingBottom: '20px',
      borderBottom: '4px solid #dc2626',
    },
     headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    },
    sectionCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #e2e8f0',
    },
    gridCard: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      borderLeft: '4px solid #ea580c',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    listBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '10px 15px',
      backgroundColor: '#f1f5f9',
      borderRadius: '6px',
      fontSize: '1.2rem',
      fontWeight: '500',
      border: '1px solid #cbd5e1',
      transition: 'background-color 0.2s',
    }
  };

  const faqs = [
    { q: "Bagaimana cara mendaftar pelatihan kerja?", a: "Pendaftaran dapat dilakukan melalui BLK terdekat atau portal resmi." },
    { q: "Apa itu program transmigrasi?", a: "Program perpindahan penduduk untuk pemerataan kesejahteraan." },
    { q: "Cara lapor pelanggaran?", a: "Laporan melalui email resmi atau datang langsung ke bidang pengawasan." },
  ];

  const fungsiList = [
    "Perumusan Kebijakan teknis bidang ketenagakerjaan.",
    "Pelaksanaan kebijakan di bidang pelatihan & produktivitas.",
    "Pelaksanaan evaluasi dan pelaporan berkala.",
    "Pembinaan administrasi internal unit kerja.",
    "Pelaksanaan tugas kedinasan lain dari Gubernur."
  ];

  const strukturOrganisasi = [
    { title: "Kepala Dinas", role: "Pimpinan Utama" },
    { title: "Sekretariat", role: "Dukungan Administrasi" },
    { title: "Bidang Pelatihan Kerja & Produktivitas", role: "Pelatihan & Sertifikasi" },
    { title: "Bidang Penempatan Tenaga Kerja & Transmigrasi", role: "Kesempatan Kerja" },
    { title: "Bidang HI & Jamsos", role: "Hubungan Industrial" },
    { title: "Bidang Pengawasan Ketenagakerjaan", role: "Penegakan Hukum & K3" }
  ];

  const uptdList = [
    "BLK Cilacap", "BLK Semarang 1", "BLK Semarang 2", 
    "Balai Pelayanan Penyelesaian Perselisihan Tenaga Kerja (BP3TK)", "Balai Kesehatan dan Keselamatan Kerja",
    "Satwasker Semarang", "Satwasker Pati",
    "Satwasker Magelang", "Satwasker Surakarta",
    "Satwasker Banyumas", "Satwasker Pekalongan"
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLogos}>
          <img src="/img/jateng.png" alt="Jateng" style={{ height: "70px" }} />
          <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
          <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
        </div> 
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Dinas Tenaga Kerja dan Transmigrasi
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#0f30eb', fontWeight: '600' }}>
          Provinsi Jawa Tengah
        </p>
      </header>

      <section 
        style={styles.sectionCard}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <Book style={{ color: '#2563eb', marginRight: '12px' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Dasar Hukum</h3>
        </div>
        <p style={{ color: '#475569', textAlign: 'justify' }}>
          Sesuai <strong>Perda No. 9 Tahun 2016</strong> dan <strong>Pergub No. 64 Tahun 2016</strong>, 
          instansi ini berfungsi sebagai unsur pelaksana urusan pemerintahan bidang tenaga kerja dan transmigrasi 
          di bawah naungan Gubernur Jawa Tengah.
        </p>
      </section>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px' }}>
          <ShieldCheck style={{ color: '#16a34a', marginRight: '12px' }} />
          Fungsi Strategis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {fungsiList.map((item, idx) => (
            <div 
              key={idx} 
              style={{ ...styles.listBadge, cursor: 'default' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            >
              <ChevronRight size={16} style={{ marginRight: '8px', color: '#16a34a' }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px' }}>
          <Users style={{ color: '#ea580c', marginRight: '12px' }} />
          Struktur Organisasi
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {strukturOrganisasi.map((org, idx) => (
            <div 
              key={idx} 
              style={styles.gridCard}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fff7ed';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <h4 style={{ fontWeight: '700', fontSize: '1.3rem', marginBottom: '5px' }}>{org.title}</h4>
              <p style={{ fontSize: '1rem', color: '#64748b' }}>{org.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={s.card}>
            <h2 style={{ ...s.h2, marginBottom: "20px" }}>Informasi Kantor</h2>
            {[
              { icon: "🏢", label: "Instansi", val: profilData.singkatan },
              { icon: "👤", label: "Kepala Dinas", val: profilData.kepalaKantor },
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
      <h2 style={{ ...s.h2, margin: "20px 0 15px" }}>FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={s.accordion}>
              <div style={s.accHeader} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q} <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div style={s.accBody}>{f.a}</div>}
            </div>
          ))}
    <section style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '30px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Home style={{ color: '#facc15', marginRight: '12px' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white' }}>Unit Pelaksana Teknis (UPTD)</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {uptdList.map((uptd, idx) => (
            <span 
              key={idx} 
              style={{ 
                padding: '6px 12px', 
                border: '1px solid #475569', 
                borderRadius: '20px', 
                fontSize: '1.2rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#facc15';
                e.currentTarget.style.color = '#facc15';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#475569';
                e.currentTarget.style.color = '#f8fafc';
              }}
            >
              {uptd}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
