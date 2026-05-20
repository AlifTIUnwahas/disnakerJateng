import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography,
  Grid,
  Card, 
  CardContent, 
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  Divider
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileCircleCheck, 
  faFileCircleExclamation, 
  faCalendarDays, 
  faBuildingColumns, faGavel, faListCheck, faCircleCheck, faGears, 
  faDatabase, faBoxArchive, faHandHoldingHand, faScaleBalanced,
  faFilePen, faFileCircleXmark, 
  faIdCard,
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { ModalPermohonan } from "./ModalPermohonan";
import { ModalKeberatan } from "./ModalKeberatan";
import API from "../api/axiosInstance";

export const DaftarPermohonan = () => {
  const [tabValue, setTabValue] = useState(0);
  const [permohonanList, setPermohonanList] = useState([]);
  const [keberatanList, setKeberatanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPermohonan, setOpenPermohonan] = useState(false);
  const [openKeberatan, setOpenKeberatan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil data permohonan
        const resPermohonan = await API.get("/permohonan");
        if (resPermohonan.data && resPermohonan.data.success) {
          setPermohonanList(resPermohonan.data.data || resPermohonan.data);
        } else {
          setPermohonanList(resPermohonan.data);
        }

        // Ambil data keberatan
        const resKeberatan = await API.get("/keberatan");
        if (resKeberatan.data && resKeberatan.data.success) {
          setKeberatanList(resKeberatan.data.data || resKeberatan.data);
        } else {
          setKeberatanList(resKeberatan.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data PPID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    const maskNIK = (nik) => {
      if (!nik) return "-";
      const strNik = String(nik).trim();
      if (strNik.length <= 4) return "****";   
      const lastFour = strNik.slice(-4);
      const maskedSection = "*".repeat(strNik.length - 4);
    
      return maskedSection + lastFour;
    };
    const maskNama = (nama) => {
    if (!nama) return "-";
    const namaTrim = String(nama).trim();
    const kata = namaTrim.split(" ");
  
    if (kata.length === 1) {
    if (namaTrim.length <= 2) return namaTrim;
    return `${namaTrim.slice(0, 2)}***`;
    }
  
    const kataPertama = kata[0];
    const sisaKata = kata.slice(1).map(k => `${k.charAt(0)}.`);
    return `${kataPertama} ${sisaKata.join(" ")}***`;
    };

    const maskEmail = (email) => {
      if (!email) return "-";
      const [localPart, domain] = email.split("@");
      if (!domain) return email;
    
      if (localPart.length <= 3) {
        return `***@${domain}`;
      }
      return `${localPart.slice(0, 3)}****@${domain}`;
    };
    const maskPhone = (phone) => {
      if (!phone) return "-";
      const strPhone = String(phone).trim();
      if (strPhone.length < 8) return "****";
      return `${strPhone.slice(0, 4)}****${strPhone.slice(-2)}`;
    };
    const maskKode = (kode) => {
    if (!kode) return "-";
    const strKode = String(kode).trim();
        
    if (strKode.length <= 6) return `${strKode.slice(0, 2)}***`;
        
    const prefix = strKode.slice(0, 4);
    const suffix = strKode.slice(-4);
    const middleMask = "*".repeat(strKode.length - 8 > 0 ? strKode.length - 8 : 4);
        
    return `${prefix}${middleMask}${suffix}`;
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    

  const getStatusChip = (status) => {
    const currentStatus = status || "Dalam Proses";
    switch (currentStatus) {
      case "Selesai":
      case "Diterima":
        return <Chip label={currentStatus} color="success" size="small" sx={{ fontWeight: 700 }} />;
      case "Ditolak":
        return <Chip label={currentStatus} color="error" size="small" sx={{ fontWeight: 700 }} />;
      default:
        return <Chip label={currentStatus} color="warning" size="small" sx={{ fontWeight: 700 }} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pb: 10 }}>
        <style>
        {`
          .ppid-interactive-content { font-family: 'Inter', -apple-system, sans-serif; color: #2d3436; line-height: 1.7; }
          .custom-card { background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); margin-bottom: 2rem; padding: 2.5rem; transition: all 0.3s ease; }
          .hero-card { border-left: 8px solid #1d7edb; }
          .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
          .icon-blue { color: #1d7edb; font-size: 1.8rem; }
          .icon-red { color: #d63031; font-size: 1.5rem; }
          .info-badge { display: inline-flex; align-items: center; gap: 0.6rem; background: #e1f5fe; color: #0288d1; padding: 0.7rem 1.4rem; border-radius: 50px; font-size: 1.3rem; font-weight: 600; margin-top: 1.5rem; }
          .task-grid-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; }
          .task-list { list-style: none; padding: 0; margin: 0; }
          .task-list li { display: flex; align-items: flex-start; gap: 0.8rem; margin-bottom: 1.2rem; font-size: 1.4rem; }
          .check-icon { color: #00b894; margin-top: 0.3rem; }
          .fungsi-stack { display: flex; flex-direction: column; gap: 1rem; }
          .fungsi-item { display: flex; align-items: center; gap: 1rem; padding: 1.2rem; border: 1px solid #dfe6e9; border-radius: 12px; transition: all 0.3s ease; background: #fdfdfd; text-decoration: none; color: inherit; }
          .fungsi-item:hover { background: #1d7edb; color: white; transform: translateX(10px); border-color: #1d7edb; }
          .form-ppid-card { background: #2B689C; color: #ffffff; border-radius: 14px; border: 2px solid #ffffff; padding: 2.5rem 1.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease-in-out; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; width: 180px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); }
          .form-ppid-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(13, 35, 92, 0.3); background: #112d75; }
          .form-ppid-icon { font-size: 3.5rem; margin-bottom: 1.5rem; color: #ffffff; }
          .form-ppid-title { font-size: 1.3rem; font-weight: 700; line-height: 1.4; }
          .upload-zone { border: 2px dashed #b2bec3; border-radius: 8px; padding: 16px; text-align: center; background: #fbfbfb; cursor: pointer; transition: border-color 0.2s ease; }
          .upload-zone:hover { border-color: #1d7edb; }
          @media (max-width: 900px) { .task-grid-layout { grid-template-columns: 1fr; } }
        `}
      </style>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/img/gedungDisnakertrans1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px', 
          width: '100%',
          pt: { xs: 12, md: 18 }, 
          pb: { xs: 10, md: 14 }, 
          px: 3 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, color: 'white', fontSize: { xs: "2.3rem", md: "4rem" }, lineHeight: 1.1 }}>
            Daftar Permohonan Informasi
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "850px", fontSize: "1.3rem", textTransform: "none", lineHeight: 1.6 }}>
            Transparansi pelacakan berkas permohonan informasi publik dan pengajuan keberatan masyarakat secara berkala sesuai regulasi UU Keterbukaan Informasi Publik.
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: -5 }}>
        {/* Navigation Tabs Card */}
        <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": { py: 2, fontWeight: 700, fontSize: "1.3rem" },
              borderBottom: 1,
              borderColor: "divider"
            }}
          >
            <Tab 
              icon={<FontAwesomeIcon icon={faFileCircleCheck} style={{ marginRight: '8px' }} />} 
              iconPosition="start" 
              label={`Permohonan Informasi (${permohonanList.length})`} 
            />
            <Tab 
              icon={<FontAwesomeIcon icon={faFileCircleExclamation} style={{ marginRight: '8px' }} />} 
              iconPosition="start" 
              label={`Pengajuan Keberatan (${keberatanList.length})`} 
            />
          </Tabs>
        </Card>

        {/* Loading Spinner */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress sx={{ color: "#0d235c" }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* TAB PANEL 1: DAFTAR PERMOHONAN */}
            {tabValue === 0 && (
              permohonanList.length === 0 ? (
                <Grid item xs={12}>
                  <Card sx={{ textCenter: "center", p: 5, textAlign: "center", borderRadius: "12px" }}>
                    <Typography color="textSecondary">Belum ada data permohonan informasi.</Typography>
                  </Card>
                </Grid>
              ) : (
                permohonanList.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Card sx={{ borderRadius: "12px", borderLeft: "6px solid #1d7edb", boxShadow: "0 6px 15px rgba(0,0,0,0.04)", transition: "0.2s", "&:hover": { transform: "translateY(-2px)" } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
                          <Box>
                            <Chip label={maskKode(item.kodePermohonan)} color="primary" variant="outlined" sx={{ fontWeight: 800, fontSize: " 1.2rem", mr: 1, px: 1, bgcolor: "#e1f5fe" }} />
                            <Chip label={item.kategoriPermohonan} size="small" sx={{ fontWeight: 600 }} />
                          </Box>
                          {getStatusChip(item.statusPermohonan)}
                        </Stack>

                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3436", mb: 2 }}>
                          {maskNama(item.namaPemohon)}
                        </Typography>
                                        
                        <Divider sx={{ my: 1.5 }} />
                                        
                        <Grid container spacing={2} sx={{ fontSize: "1.2rem", color: "#636e72" }}>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <FontAwesomeIcon icon={faIdCard} style={{ width: '16px', color: '#b2bec3' }} />
                                <span><strong>NIK:</strong> {maskNIK(item.nikIdentitas)}</span>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <FontAwesomeIcon icon={faEnvelope} style={{ width: '16px', color: '#b2bec3' }} />
                                <span><strong>Email:</strong> {maskEmail(item.email)}</span>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <FontAwesomeIcon icon={faPhone} style={{ width: '16px', color: '#b2bec3' }} />
                                <span><strong>No. Telp:</strong> {maskPhone(item.nomorTelepon)}</span>
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                              <Box display="flex" alignItems="flex-start" gap={1}>
                                <FontAwesomeIcon icon={faCalendarDays} style={{ width: '16px', color: '#b2bec3', marginTop: '3px' }} />
                                <span><strong>Tanggal Diajukan:</strong> {formatDate(item.createdAt)}</span>
                              </Box>
                              <Box>
                                <strong>Rincian Informasi:</strong>
                                <Typography variant="body2" sx={{ color: "#2d3436", mt: 0.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                  {item.rincianInformasi}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )
            )}

            {/* TAB PANEL 2: DAFTAR KEBERATAN */}
            {tabValue === 1 && (
              keberatanList.length === 0 ? (
                <Grid item xs={12}>
                  <Card sx={{ p: 5, textAlign: "center", borderRadius: "12px" }}>
                    <Typography color="textSecondary">Belum ada data pengajuan keberatan.</Typography>
                  </Card>
                </Grid>
              ) : (
                keberatanList.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Card sx={{ borderRadius: "12px", borderLeft: "6px solid #d63031", boxShadow: "0 6px 15px rgba(0,0,0,0.04)", transition: "0.2s", "&:hover": { transform: "translateY(-2px)" } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
                          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Typography sx={{ fontWeight: 700, color: "#d63031", fontSize: "0.9rem" }}>KODE PERMOHONAN REFF:</Typography>
                            <Chip label={maskKode(item.kodePermohonan)} color="error" variant="outlined" sx={{ fontWeight: 800, fontSize: "1.3rem", px: 1, bgcolor: "#ffebee" }} />
                          </Box>
                          {getStatusChip(item.statusKeberatan)}
                        </Stack>

                        <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1, color: "#636e72", fontSize: "1.3rem" }}>
                          <FontAwesomeIcon icon={faIdCard} />
                          <span><strong>NIK Pengaju:</strong> {maskNIK(item.nik)}</span>
                          <Box sx={{ mx: 1, color: "#dfe6e9" }}>|</Box>
                          <FontAwesomeIcon icon={faCalendarDays} />
                          <span>{formatDate(item.createdAt)}</span>
                        </Box>

                        <Box sx={{ mt: 2, bgcolor: "#f8f9fa", p: 2, borderRadius: "8px", border: "1px solid #dfe6e9" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2d3436", mb: 0.5 }}>
                            Kronologi Keberatan:
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#636e72", lineHeight: 1.5 }}>
                            {item.kronologi}
                          </Typography>
                        </Box>

                        {/* Menampilkan list alasan keberatan yang di-centang */}
                        {item.alasanKeberatan && item.alasanKeberatan.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" display="block" sx={{ fontWeight: 700, color: "#b2bec3", textTransform: "uppercase", mb: 0.5 }}>
                              Alasan Pengajuan:
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1}>
                              {/* Kasus jika alasanKeberatan disimpan dalam bentuk string stringified JSON array atau array biasa */}
                              {(Array.isArray(item.alasanKeberatan) ? item.alasanKeberatan : JSON.parse(item.alasanKeberatan || "[]")).map((alasan, idx) => (
                                <Chip key={idx} label={alasan} size="small" variant="text" sx={{ bgcolor: "#f5f5f5", maxW: "100%", height: "auto", py: 0.5, "& .MuiChip-label": { whiteSpace: "normal" } }} />
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )
            )}
          </Grid>
        )}
      </Container>
        <div className="ppid-interactive-content">
                
                {/* Grid Menu Pilihan Form */}
                <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'center' }} alignItems="stretch">
                  <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" >
                    <div className="form-ppid-card" onClick={() => setOpenPermohonan(true)}>
                      <FontAwesomeIcon icon={faFilePen} className="form-ppid-icon" />
                      <div className="form-ppid-title">Form Permohonan <br /> Informasi Publik</div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                    <div className="form-ppid-card" onClick={() => setOpenKeberatan(true)}>
                      <FontAwesomeIcon icon={faFileCircleXmark} className="form-ppid-icon" />
                      <div className="form-ppid-title">Form Pengajuan <br />Keberatan</div>
                    </div>
                  </Grid>
                </Grid>
      
                {/* RENDERING MODAL YANG TELAH DIPISAH */}
                <ModalPermohonan open={openPermohonan} onClose={() => setOpenPermohonan(false)} />
                <ModalKeberatan open={openKeberatan} onClose={() => setOpenKeberatan(false)} />
        </div>
    </Box>
  );
};