import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from "@mui/material";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  UserOutlined,
  CloseOutlined,
  FileTextOutlined
} from "@ant-design/icons";

export const Team = (props) => {
  const [agendaData, setAgendaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State manajemen Modal Detail
  const [openModal, setOpenModal] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/agenda`);
        setAgendaData(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data agenda:", err);
        setError("Gagal memuat data agenda dinas terbaru.");
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  // Fungsi mengendalikan buka/tutup modal
  const handleOpenModal = (agenda) => {
    setSelectedAgenda(agenda);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAgenda(null);
  };

  // Helper pemformatan waktu Indonesia lokal (WIB)
  const formatDateTime = (dateStr) => {
    if (!dateStr) return { date: "-", time: "-" };
    const dt = new Date(dateStr);
    
    const dateFormatted = dt.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    const timeFormatted = dt.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }) + " WIB";

    return { date: dateFormatted, time: timeFormatted };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
        <CircularProgress size={40} sx={{ color: '#2B689C' }} />
        <Typography sx={{ mt: 2, color: 'text.secondary', fontFamily: "'Source Sans 3', sans-serif" }}>
          Memuat data agenda dinas...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
      <Box id="agenda-dinas" sx={{ bgcolor: "#ffffff", py: 4, mt: 4, }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: "#1a365d", mb: 1, fontSize: "3rem", fontFamily: "'Source Sans 3', sans-serif" }}>
              AGENDA DINAS
            </Typography>
            <Box sx={{ width: "80px", height: "4px", bgcolor: "#2B689C", mx: "auto", mb: 2, borderRadius: "2px" }} />
          </Box>

        <Grid container spacing={3} alignItems="stretch" sx={{ width: '100%', m: 0 }}>
          {agendaData.length > 0 ? (
            agendaData.map((agenda) => {
              // PERBAIKAN: Menggunakan agenda.waktuPelaksanaan sesuai dengan struktur model DB
              const { date, time } = formatDateTime(agenda.waktu);
              
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={agenda._id || agenda.id} sx={{ display: 'flex' }}>
                  <Card
                    elevation={0}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      bgcolor: '#ffffff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.05)',
                        borderColor: '#2B689C'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={agenda.foto} 
                      alt={agenda.namaAgenda}
                      sx={{ 
                        objectFit: 'cover',
                        borderBottom: '1px solid #f1f5f9',
                        bgcolor: '#f8fafc'
                      }}
                    />

                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      
                      {/* Judul Utama Agenda */}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: '#1e293b',
                          fontSize: '1.5rem',
                          lineHeight: 1.4,
                          mb: 2,
                          fontFamily: "'Source Sans 3', sans-serif",
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '2.8em'
                        }}
                      >
                        {agenda.namaAgenda}
                      </Typography>

                      <Box sx={{ width: '100%', borderTop: '1px dashed #e2e8f0', mb: 2 }} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                          <CalendarOutlined style={{ color: '#94a3b8', marginTop: '3px' }} />
                          <Typography sx={{ fontSize: '14px', color: '#475569', fontFamily: "'Source Sans 3', sans-serif" }}>
                            {date}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                          <ClockCircleOutlined style={{ color: '#94a3b8', marginTop: '3px' }} />
                          <Typography sx={{ fontSize: '14px', color: '#475569', fontFamily: "'Source Sans 3', sans-serif" }}>
                            {time}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                          <EnvironmentOutlined style={{ color: '#94a3b8', marginTop: '3px' }} />
                          <Typography sx={{ 
                            fontSize: '14px', 
                            color: '#475569', 
                            fontFamily: "'Source Sans 3', sans-serif",
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {agenda.tempat}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                          <UserOutlined style={{ color: '#94a3b8', marginTop: '3px' }} />
                          <Typography sx={{ fontSize: '14px', color: '#475569', fontFamily: "'Source Sans 3', sans-serif" }}>
                            Pimpinan: <strong>{agenda.pimpinanRapat || '-'}</strong>
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mt: 'auto', pt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Chip
                          label={agenda.status || 'Mendatang'}
                          size="small"
                          sx={{
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: "'Source Sans 3', sans-serif",
                            bgcolor: agenda.status === 'Selesai' ? '#f0fdf4' : '#fff7ed',
                            color: agenda.status === 'Selesai' ? '#16a34a' : '#ea580c',
                            border: `1px solid ${agenda.status === 'Selesai' ? '#bbf7d0' : '#ffedd5'}`
                          }}
                        />
                        
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenModal(agenda)}
                          sx={{
                            textTransform: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontFamily: "'Source Sans 3', sans-serif",
                            color: '#2B689C',
                            borderColor: '#cbd5e1',
                            '&:hover': {
                              borderColor: '#2B689C',
                              bgcolor: '#f8fafc'
                            }
                          }}
                        >
                          Detail
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box sx={{ py: 8, textAlign: 'center', width: '100%' }}>
              <InfoCircleOutlined style={{ fontSize: '32px', color: '#94a3b8', marginBottom: '12px' }} />
              <Typography sx={{ color: 'text.secondary', fontFamily: "'Source Sans 3', sans-serif" }}>
                Tidak ada agenda dinas terdaftar yang dapat ditampilkan.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>

      {/* ==================== MODAL DIALOG DETAIL AGENDA ==================== */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '550px', md: '650px' },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
            overflowY: 'auto',
            outline: 'none',
            p: 0
          }}>
            {selectedAgenda && (() => {
              const { date, time } = formatDateTime(selectedAgenda.waktu);
              return (
                <Box>
                  {/* Bagian Gambar Atas Modal */}
                  <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', sm: '280px' }, bgcolor: '#f8fafc' }}>
                    <CardMedia
                      component="img"
                      image={selectedAgenda.foto}
                      alt={selectedAgenda.namaAgenda}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Tombol Silang (X) pojok kanan atas gambar */}
                    <IconButton
                      onClick={handleCloseModal}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: '#ffffff',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
                      }}
                    >
                      <CloseOutlined />
                    </IconButton>
                  </Box>

                  {/* Informasi Konten Detail di dalam Modal */}
                  <Box sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 2 }}>
                      <Chip
                        label={selectedAgenda.status || 'Mendatang'}
                        sx={{
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: "'Source Sans 3', sans-serif",
                          bgcolor: selectedAgenda.status === 'Selesai' ? '#f0fdf4' : '#fff7ed',
                          color: selectedAgenda.status === 'Selesai' ? '#16a34a' : '#ea580c',
                          border: `1px solid ${selectedAgenda.status === 'Selesai' ? '#bbf7d0' : '#ffedd5'}`
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: "'Source Sans 3', sans-serif", fontSize: '1.5rem' }}>
                        Oleh: {selectedAgenda.oleh || 'Sekretariat'}
                      </Typography>
                    </Box>

                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#1a365d', mb: 3, fontSize: '1.5rem', fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.4 }}>
                      {selectedAgenda.namaAgenda}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#f8fafc', p: 2.5, borderRadius: '12px', border: '1px solid #f1f5f9', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CalendarOutlined style={{ color: '#2B689C', fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#334155', fontFamily: "'Source Sans 3', sans-serif" }}>
                          <strong>Hari / Tanggal:</strong> {date}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ClockCircleOutlined style={{ color: '#2B689C', fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#334155', fontFamily: "'Source Sans 3', sans-serif" }}>
                          <strong>Waktu:</strong> {time}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <EnvironmentOutlined style={{ color: '#2B689C', fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#334155', fontFamily: "'Source Sans 3', sans-serif" }}>
                          <strong>Tempat:</strong> {selectedAgenda.tempat}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <UserOutlined style={{ color: '#2B689C', fontSize: '16px' }} />
                        <Typography sx={{ fontSize: '14px', color: '#334155', fontFamily: "'Source Sans 3', sans-serif" }}>
                          <strong>Pimpinan Rapat:</strong> {selectedAgenda.pimpinanRapat || '-'}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Deskripsi Tambahan / Keterangan */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: "'Source Sans 3', sans-serif" }}>
                      <FileTextOutlined /> Keterangan Agenda
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#475569', fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {selectedAgenda.keterangan || 'Tidak ada keterangan tambahan untuk agenda dinas ini.'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                      <Button
                        onClick={handleCloseModal}
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '8px',
                          bgcolor: '#2B689C',
                          fontFamily: "'Source Sans 3', sans-serif",
                          '&:hover': { bgcolor: '#1e4b73' }
                        }}
                      >
                        Tutup Detail
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};