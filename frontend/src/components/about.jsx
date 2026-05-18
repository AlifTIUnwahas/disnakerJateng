import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert
} from "@mui/material";

import { 
  EnvironmentOutlined, 
  BankOutlined, 
  CalendarOutlined
} from "@ant-design/icons";

export const About = () => {
  const [lowonganData, setLowonganData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm] = useState("");
  const [filterLokasi] = useState("Semua");

  useEffect(() => {
    const fetchBursaKerja = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/bursa-kerja");
        setLowonganData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data bursa kerja.");
        setLoading(false);
      }
    };
    fetchBursaKerja();
  }, []);

  const lokasiList = ["Semua", ...new Set(lowonganData.map(item => item.lokasi))];

  const filteredJobs = lowonganData.filter(job => {
    const matchesSearch = 
      (job.posisi?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
      (job.perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesLokasi = filterLokasi === "Semua" || job.lokasi === filterLokasi;
    return matchesSearch && matchesLokasi;
  });

  const formatDeadline = (dateStr) => {
    if (!dateStr) return { label: "-", color: "default" };
    
    const deadlineDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    deadlineDate.setHours(0,0,0,0);

    const timeDiff = deadlineDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const formattedDate = deadlineDate.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });

    if (daysDiff < 0) return { label: "Ditutup", color: "error" };
    if (daysDiff === 0) return { label: "Hari Ini Terakhir!", color: "error" };
    if (daysDiff <= 3) return { label: `Sisa ${daysDiff} Hari!`, color: "warning" };
    return { label: formattedDate, color: "secondary" };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
        <CircularProgress size={40} sx={{ color: '#2B689C' }} />
        <Typography sx={{ mt: 2, color: 'text.secondary', fontFamily: "'Source Sans 3', sans-serif" }}>Menghubungkan ke database...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box id="bursa-kerja" sx={{ bgcolor: "#fcfdfe", py: 2, mt: 2, mb:1 }}>
      <Container maxWidth={false}>
        
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: "#1a365d", mb: 1, fontSize: "3rem", fontFamily: "'Source Sans 3', sans-serif" }}>
            BURSA KERJA
          </Typography>
          <Box sx={{ width: "80px", height: "4px", bgcolor: "#2B689C", mx: "auto", mb: 2, borderRadius: "2px" }} />
        </Box>
        <Grid container spacing={3} alignItems="stretch" sx={{ width: '100%', m: 0 }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const deadlineStatus = formatDeadline(job.deadline);
              return (
                <Grid item xs={12} sm={6} md={4} key={job._id || job.id} sx={{ display: 'flex' }}>
                  <Card 
                    elevation={0}
                    sx={{
                      width: '100%', 
                      height: '100%', 
                      display: 'flex',
                      justifyContent: 'space-between', 
                      flexDirection: 'column',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      bgcolor: '#ffffff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px rgba(43, 104, 156, 0.08)',
                        borderColor: '#2B689C'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {/* Badge Lokasi */}
                      <Box sx={{ mb: 1.5 }}>
                        <Chip 
                          icon={<EnvironmentOutlined style={{ color: '#2B689C', fontSize: '18px' }} />}
                          label={job.lokasi} 
                          size="small"
                          sx={{ 
                            bgcolor: '#f1f5f9', 
                            color: '#475569', 
                            fontWeight: 600,
                            fontSize: '11px',
                            fontFamily: "'Source Sans 3', sans-serif",
                            '& .MuiChip-icon': { ml: '4px' }
                          }}
                        />
                      </Box>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          fontWeight: 600, 
                          color: '#1e293b', 
                          fontSize: '1.3rem', 
                          lineHeight: 1.4,
                          mb: 1,
                          textTransform: 'capitalize',
                          fontFamily: "'Source Sans 3', sans-serif",
                          height: '2.8em'
                        }}
                      >
                        {job.posisi.toLowerCase()}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px',
                          color: '#000000', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1, 
                          mb: 3,
                          fontFamily: "'Source Sans 3', sans-serif"
                        }}
                      >
                        <BankOutlined style={{ color: '#94a3b8' }} /> {job.perusahaan}
                      </Typography>
                      <Box sx={{ 
                        mt: 'auto', 
                        pt: 2, 
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'between',
                        width: '100%'
                      }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" display="block" sx={{ color: '#0f0f0f', fontSize: '14px', mb: 0.5, fontFamily: "'Source Sans 3', sans-serif" }}>
                            <CalendarOutlined /> Batas Lamaran
                          </Typography>
                          <Chip 
                            label={deadlineStatus.label} 
                            color={deadlineStatus.color}
                            size="small"
                            variant={deadlineStatus.color === 'secondary' ? 'outlined' : 'filled'}
                            sx={{ 
                              fontSize: '14px', 
                              fontWeight: 500, 
                              borderRadius: '6px',
                              height: '24px',
                              fontFamily: "'Source Sans 3', sans-serif"
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box sx={{ py: 6, textAlign: 'center', width: '100%' }}>
              <Typography sx={{ color: 'text.secondary', fontFamily: "'Source Sans 3', sans-serif" }}>
                Tidak ada lowongan aktif yang sesuai kata kunci.
              </Typography>
            </Box>
          )}
        </Grid>

      </Container>
    </Box>
  );
};