import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuildingColumns, 
  faGavel, 
  faListCheck, 
  faCircleCheck, 
  faGears, 
  faDatabase, 
  faBoxArchive, 
  faHandHoldingHand, 
  faScaleBalanced 
} from '@fortawesome/free-solid-svg-icons';

export const ProfilPpid = () => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* CSS Injected Styles */}
      <style>
        {`
          .ppid-interactive-content {
            font-family: 'Inter', -apple-system, sans-serif;
            color: #2d3436;
            line-height: 1.7;
          }
          .custom-card {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
            padding: 2.5rem;
            transition: all 0.3s ease;
          }
          .hero-card {
            border-left: 8px solid #1d7edb;
          }
          .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          .icon-blue { color: #1d7edb; font-size: 1.8rem; }
          .icon-red { color: #d63031; font-size: 1.5rem; }
          
          .info-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: #e1f5fe;
            color: #0288d1;
            padding: 0.7rem 1.4rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-top: 1.5rem;
          }
          .task-grid-layout {
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 2rem;
          }
          .task-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .task-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
            font-size: 1rem;
          }
          .check-icon {
            color: #00b894;
            margin-top: 0.3rem;
          }
          .fungsi-stack {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .fungsi-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.2rem;
            border: 1px solid #dfe6e9;
            border-radius: 12px;
            transition: all 0.3s ease;
            background: #fdfdfd;
            text-decoration: none;
            color: inherit;
          }
          .fungsi-item:hover {
            background: #1d7edb;
            color: white;
            transform: translateX(10px);
            border-color: #1d7edb;
          }
          .fungsi-item svg {
            font-size: 1.2rem;
            width: 25px;
          }
          @media (max-width: 900px) {
            .task-grid-layout { grid-template-columns: 1fr; }
          }
        `}
      </style>

      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/img/gedungDisnakertrans1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pt: { xs: 15, md: 22 }, 
          pb: { xs: 12, md: 18 }, 
          px: 3 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, color: 'white', fontSize: { xs: "2.5rem", md: "4rem" }, lineHeight: 1.1 }}>
            Profil PPID
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "850px", textTransform: "none", fontSize: "1.2rem", lineHeight: 1.6 }}>
            Setiap Badan Publik memiliki kewajiban untuk memberikan akses informasi kepada masyarakat, sebagaimana diatur dalam Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: -8, pb: 10, position: 'relative', zIndex: 10 }}>
        <div className="ppid-interactive-content">
          
          {/* Bagian 1: Latar Belakang */}
          <div className="custom-card hero-card">
            <div className="section-header">
              <FontAwesomeIcon icon={faBuildingColumns} className="icon-blue" />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>Sejarah & Landasan Hukum</Typography>
            </div>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
              Reformasi yang bergulir pada tahun 2008 ditandai dengan 3 (tiga) tuntutan yaitu <strong>demokratisasi, transparansi dan supremasi hukum dan Hak Asasi Manusia</strong>, telah merubah latar kehidupan bermasyarakat, berbangsa dan bernegara.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
              Adapun konsekuensi dari tuntutan reformasi tersebut di antaranya penetapan <strong>Undang-undang Republik Indonesia Nomor 14 Tahun 2008</strong> tentang Keterbukaan informasi publik yang bertujuan untuk mewujudkan tata kelola pemerintahan yang baik (<i>good governance</i>).
            </Typography>
            <div className="info-badge">
              <a href="https://drive.google.com/file/d/1a9_dv5_2IjdP1a2WTi_XXsVhSkU-1QQc/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGavel} /> Keputusan Gubernur Jawa Tengah No. 550/1 TAHUN 2013
              </a>
            </div>
          </div>

          <div className="task-grid-layout">
            {/* Bagian 2: Tugas */}
            <div className="custom-card">
              <div className="section-header">
                <FontAwesomeIcon icon={faListCheck} className="icon-red" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Tugas PPID</Typography>
              </div>
              <ul className="task-list">
                {[
                  "Penyediaan, penyimpanan, pendokumentasian, dan pengamanan informasi.",
                  "Pelayanan informasi sesuai dengan aturan yang berlaku.",
                  "Pelayanan informasi publik yang cepat, tepat dan sederhana.",
                  "Penetapan prosedur operasional penyebarluasan informasi publik.",
                  "Pengujian konsekuensi.",
                  "Pengklasifikasian informasi dan/atau pengubahannya.",
                  "Penetapan informasi yang dikecualikan yang habis jangka waktu.",
                  "Penetapan pertimbangan tertulis atas setiap kebijakan."
                ].map((item, i) => (
                  <li key={i}>
                    <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bagian 3: Fungsi */}
            <div className="custom-card">
              <div className="section-header">
                <FontAwesomeIcon icon={faGears} className="icon-blue" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Fungsi Utama</Typography>
              </div>
              <div className="fungsi-stack">
                <FungsiItem icon={faDatabase} text="Pengelolaan Informasi" />
                <FungsiItem icon={faBoxArchive} text="Dokumentasi Arsip" />
                <FungsiItem icon={faHandHoldingHand} text="Pelayanan Informasi" />
                <FungsiItem icon={faScaleBalanced} text="Pelayanan & Penyelesaian Sengketa" />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Box>
  );
};

const FungsiItem = ({ icon, text }) => (
  <div className="fungsi-item">
    <FontAwesomeIcon icon={icon} />
    <Typography sx={{ fontWeight: 600 }}>{text}</Typography>
  </div>
);
