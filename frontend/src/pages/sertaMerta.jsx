import React from "react";
import { 
  Box, 
  Container, 
  Typography,  
  Grid,
  Card, 
  CardContent, 
  Stack 
} from "@mui/material";
import { ArrowRight } from "lucide-react";

// Komponen Card dengan animasi hover seperti referensi
const InfoCard = ({ title, desc, link }) => (
  <Card 
    onClick={() => window.open(link, '_blank')}
    variant="outlined" 
    sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 6, 
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
      border: '1px solid #eee',
      // Background Image sebagai identitas visual kartu
      background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/img/ppid.PNG")`,
      backgroundSize: '120px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 20px bottom 20px',
      
      '&:hover': { 
        bgcolor: '#5ca9fb', 
        backgroundImage: `linear-gradient(rgba(92, 169, 251, 0.9), rgba(92, 169, 251, 0.9)), url("/img/ppid.PNG")`,
        transform: 'translateY(-8px)',
        boxShadow: '0 15px 35px rgba(92, 169, 251, 0.3)',
        '& .text-target': { color: '#ffffff !important' },
        '& .decoration-dots div': { bgcolor: '#ffffff', opacity: 0.4 }
      }
    }}
  >
    <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
      {/* Judul */}
      <Typography 
        className="text-target"
        sx={{ 
          fontWeight: 800, 
          mb: 2, 
          color: "#001d3d", 
          fontSize: "1.8rem",
          lineHeight: 1.2,
          transition: '0.3s'
        }}
      >
        {title}
      </Typography>

      {/* Deskripsi */}
      <Typography 
        className="text-target"
        sx={{ 
          color: "#666", 
          mb: 4, 
          fontSize: "1.05rem",
          lineHeight: 1.6,
          minHeight: '60px',
          transition: '0.3s',
          maxWidth: '85%' // Memberi ruang agar teks tidak menabrak background di kanan
        }}
      >
        {desc}
      </Typography>

      {/* Tombol Link */}
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={1}
        className="text-target"
        sx={{ color: "#1d7edb", fontWeight: "bold", transition: '0.3s' }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Selengkapnya</Typography>
        <ArrowRight size={20} />
      </Stack>

      {/* Dekorasi Titik-titik */}
      <Box 
        className="decoration-dots"
        sx={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '5px',
          opacity: 0.1
        }}
      >
        {[...Array(9)].map((_, i) => (
          <Box key={i} sx={{ width: 5, height: 5, bgcolor: '#000', borderRadius: '50%', transition: '0.3s' }} />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export const Serta = (props) => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "50vh" }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/img/gedungDisnakertrans1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '500px', 
          width: '100%',
          pt: { xs: 15, md: 22 }, 
          pb: { xs: 12, md: 18 }, 
          px: 3 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, color: 'white', fontSize: { xs: "2.5rem", md: "4.5rem" }, lineHeight: 1.1 }}>
            Informasi Serta Merta
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "850px", fontSize: "1.3rem", textTransform: "none", lineHeight: 1.6 }}>
            Sesuai Pasal 11 Undang-Undang Nomor 14 Tahun 2008 mengenai Keterbukaan Informasi Publik, 
            Badan Publik wajib menyediakan Informasi Publik setiap saat yang dapat diakses oleh Pengguna Informasi Publik.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: -10, pb: 10, position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ borderRadius: 6, p: { xs: 3, md: 6 }, boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
          {/* Grid Cards */}
          <Grid container spacing={4} sx={{ display: 'flex' }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <InfoCard title="DIP 2025" desc="Daftar Informasi Publik Dinas Tenaga Kerja dan Transmigrasi Tahun 2025." link="https://drive.google.com/file/d/1LIffiukyRMOrk7exyGYXo5j4tAAHLlfo/view?usp=sharing" />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <InfoCard title="DIP 2024" desc="Daftar Informasi Publik Dinas Tenaga Kerja dan Transmigrasi Tahun 2024." link="https://drive.google.com/file/d/1FnGy2-n7YjdBY-EPEceayalPN-fr_gcJ/view?usp=sharing" />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <InfoCard title="DIP 2023" desc="Daftar Informasi Publik Dinas Tenaga Kerja dan Transmigrasi Tahun 2023." link="https://drive.google.com/file/d/1CcNmBiHDU3q1xOiJu7-IDHtXagRK2Paj/view?usp=sharing" />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};