import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Alert,
  Zoom,
} from "@mui/material";
import {
  IdcardOutlined,
  SafetyCertificateOutlined,
  ReconciliationOutlined,
  EyeOutlined,
  EnvironmentOutlined,
  InsuranceOutlined,
} from "@ant-design/icons";

const LAYANAN_DATA = [
  {
    judul: "Penempatan Tenaga Kerja",
    deskripsi: "Fasilitasi penempatan tenaga kerja dalam dan luar negeri, serta bursa kerja.",
    warna: "#1A5276",
    tags: ["AKL", "AKAD", "AKAN"],
    link: "/layanan/penempatan",
    icon: <IdcardOutlined />,
  },
  {
    judul: "Pelatihan & Sertifikasi",
    deskripsi: "Pelatihan kerja berbasis kompetensi melalui jaringan BLK di seluruh Jawa Tengah.",
    warna: "#1E8449",
    tags: ["BLK", "Sertifikasi BNSP", "Magang"],
    link: "/layanan/pelatihan",
    icon: <SafetyCertificateOutlined />,
  },
  {
    judul: "Hubungan Industrial",
    deskripsi: "Mediasi, konsiliasi, dan arbitrase perselisihan hubungan industrial.",
    warna: "#7D6608",
    tags: ["PHK", "Upah", "PKB"],
    link: "/layanan/hubungan-industrial",
    icon: <ReconciliationOutlined />,
  },
  {
    judul: "Pengawasan Ketenagakerjaan",
    deskripsi: "Pemeriksaan norma kerja dan K3 di perusahaan sesuai perundang-undangan.",
    warna: "#922B21",
    tags: ["Norma Kerja", "K3", "Inspeksi"],
    link: "/layanan/pengawasan",
    icon: <EyeOutlined />,
  },
  {
    judul: "Transmigrasi",
    deskripsi: "Program transmigrasi umum dan swakarsa mandiri bagi keluarga transmigran.",
    warna: "#515A5A",
    tags: ["TU", "TBS", "TSM"],
    link: "/layanan/transmigrasi",
    icon: <EnvironmentOutlined />,
  },
  {
    judul: "Jaminan Sosial Ketenagakerjaan",
    deskripsi: "Koordinasi kepesertaan BPJS Ketenagakerjaan dan perlindungan pekerja.",
    warna: "#154360",
    tags: ["BPJS", "JHT", "JKK"],
    link: "/layanan/jaminan-sosial",
    icon: <InsuranceOutlined />,
  },
];

const PROFIL_DATA = {
  telepon: "(024) 8311713 / (024) 8311711",
  email: "disnakertrans@jatengprov.go.id",
};

const LayananCard = ({ layanan, delay }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <Grid item xs={12} sm={6} md={4} display="flex">
      <Zoom in={shown} style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}>
        <Card
          sx={{
            height: "100%",
            width: "415px",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            border: "1px solid #eee",
            boxShadow: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            },
            "&:hover .ikon-circle": {
              backgroundColor: layanan.warna,
              color: "#fff",
            },
          }}
          onClick={() => window.location.href = layanan.link}
        >
          <CardContent sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
            <Box
              className="ikon-circle"
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                backgroundColor: `${layanan.warna}1a`,
                color: layanan.warna,
                transition: "all 0.3s ease",
                fontSize: 28,
              }}
            >
              {layanan.icon}
            </Box>

            <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom color="text.primary">
              {layanan.judul}
            </Typography>
            
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              {layanan.deskripsi}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto" }}>
              {layanan.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: `${layanan.warna}1a`,
                    color: layanan.warna,
                    fontWeight: 700,
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Zoom>
    </Grid>
  );
};

export const Testimonials = () => {
  return (
    <Box id="layanan" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: "#1a365d", mb: 1, fontSize: "3rem", fontFamily: "'Source Sans 3', sans-serif" }}>
            LAYANAN
          </Typography>
          <Box sx={{ width: "80px", height: "4px", bgcolor: "#2B689C", mx: "auto", mb: 2, borderRadius: "2px" }} />
      </Box>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 3, sm: 5, md: 8 } }}>
        <Grid container spacing={4} alignItems="center"> 
          {LAYANAN_DATA.map((l, i) => (
            <LayananCard key={l.judul} layanan={l} delay={i * 80} />
          ))}
        </Grid>

        <Alert
          icon={false}
          sx={{
            mt: 6,
            backgroundColor: "#ecebeb",
            borderLeft: "5px solid #17a2b8",
            borderRadius: 2,
            p: 3,
            color: "#0c2060",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Untuk informasi lebih lanjut atau pengaduan, silakan hubungi kami melalui telepon{" "}
            <strong>{PROFIL_DATA.telepon}</strong> atau email ke{" "}
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFIL_DATA.email}&su=Tanya%20Informasi&body=Halo%20Disnakertrans,...`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline' }}
            >
              {PROFIL_DATA.email}
            </a>
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};