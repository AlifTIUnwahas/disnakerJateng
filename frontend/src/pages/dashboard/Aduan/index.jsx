import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Tab, Tabs, Card, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Button, IconButton, Tooltip, Avatar, CircularProgress
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCircleCheck, faInbox, faCircleExclamation, faEye,
  faCheck, faXmark, faEnvelope, faPhone, faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { getPermohonan, getKeberatan, updateStatusPermohonan, updateStatusKeberatan } from './aduanService';
import { AduanForm } from './aduanForm';

export const DashboardAduan = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [permohonanList, setPermohonanList] = useState([]);
  const [keberatanList, setKeberatanList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Manajemen Dialog Detail Permohonan
  const [selectedPermohonan, setSelectedPermohonan] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const pData = await getPermohonan();
      const kData = await getKeberatan();
      
      setPermohonanList(Array.isArray(pData) ? pData : []);
      setKeberatanList(Array.isArray(kData) ? kData : []);
    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
      setPermohonanList([]);
      setKeberatanList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePermohonanStatus = async (id, newStatus) => {
    try {
      await updateStatusPermohonan(id, newStatus);
      fetchData();
    } catch (err) {
      alert("Gagal memperbarui status permohonan");
    }
  };

  const handleKeberatanStatus = async (id, newStatus) => {
    try {
      await updateStatusKeberatan(id, newStatus);
      fetchData();
    } catch (err) {
      alert("Gagal memperbarui status keberatan");
    }
  };

  // Fungsi Masking Keamanan Frontend
  const maskText = (text, type) => {
    if (!text) return "-";
    if (type === 'nik') return `${text.slice(0, 6)}******${text.slice(-4)}`;
    if (type === 'phone') return `${text.slice(0, 4)}****${text.slice(-2)}`;
    if (type === 'email') {
      const [local, domain] = text.split('@');
      return `${local.slice(0, 3)}****@${domain}`;
    }
    return text;
  };

  const totalPermohonan = Array.isArray(permohonanList) ? permohonanList.length : 0;
  
  // Menggunakan p.status sesuai dengan field model MongoDB Permohonan Anda
  const pendingPermohonan = Array.isArray(permohonanList) 
    ? permohonanList.filter(p => p.status === 'Pending' || p.status === 'Diproses').length 
    : 0;
    
  const totalKeberatan = Array.isArray(keberatanList) ? keberatanList.length : 0;

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        
        {/* Header Tampilan */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#2c3e50" }}>
            Pusat Kontrol Informasi PPID
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Kelola berkas permohonan informasi masuk dan pengajuan keberatan operasional Disnakertrans Jawa Tengah.
          </Typography>
        </Box>

        {/* Baris Kartu Informasi Statistik */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3, borderLeft: '6px solid #2980b9' }}>
              <Avatar sx={{ bgcolor: '#e1f5fe', color: '#2980b9', width: 56, height: 56 }}>
                <FontAwesomeIcon icon={faInbox} size="lg" />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalPermohonan}</Typography>
                <Typography variant="body2" color="textSecondary">Total Permohonan</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3, borderLeft: '6px solid #e67e22' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#e67e22', width: 56, height: 56 }}>
                <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{pendingPermohonan}</Typography>
                <Typography variant="body2" color="textSecondary">Permohonan Pending/Diproses</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3, borderLeft: '6px solid #e74c3c' }}>
              <Avatar sx={{ bgcolor: '#ffebee', color: '#e74c3c', width: 56, height: 56 }}>
                <FontAwesomeIcon icon={faFileCircleCheck} size="lg" />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalKeberatan}</Typography>
                <Typography variant="body2" color="textSecondary">Berkas Keberatan Masuk</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Tab Kontrol Navigasi */}
        <Paper sx={{ borderRadius: 3, mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newVal) => setActiveTab(newVal)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label={`Daftar Permohonan (${totalPermohonan})`} sx={{ fontWeight: 700 }} />
            <Tab label={`Daftar Keberatan (${totalKeberatan})`} sx={{ fontWeight: 700 }} />
          </Tabs>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* ISI PANEL TAB 1: PERMOHONAN */}
            {activeTab === 0 && (
              <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Kode & Kategori</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Data Identitas Pemohon</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Rincian & Tujuan</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Metode Salinan</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Aksi Manajemen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permohonanList.map((row) => (
                      <TableRow key={row._id} hover>
                        <TableCell>
                          <Chip label={row.kodePermohonan} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700, mb: 1 }} />
                          <Typography variant="body2" fontWeight={600}>{row.kategoriPermohonan}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{row.namaPemohon}</Typography>
                          <Box sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.5 }}>
                            <div><FontAwesomeIcon icon={faIdCard} style={{ marginRight: 6 }} /> {maskText(row.nikIdentitas, 'nik')}</div>
                            <div><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 6 }} /> {maskText(row.email, 'email')}</div>
                            <div><FontAwesomeIcon icon={faPhone} style={{ marginRight: 6 }} /> {maskText(row.nomorTelepon, 'phone')}</div>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 200, fontWeight: 500 }}><strong>Info:</strong> {row.rincianInformasi}</Typography>
                          <Typography variant="body2" noWrap color="textSecondary" sx={{ maxWidth: 200 }}><strong>Tujuan:</strong> {row.tujuanPenggunaan}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>{row.mendapatkanSalinan}</Typography>
                          <Typography variant="caption" color="textSecondary" display="block">{row.caraMendapatkanSalinan}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status || "Pending"} 
                            size="small"
                            color={row.status === 'Selesai' ? 'success' : row.status === 'Diproses' ? 'warning' : row.status === 'Ditolak' ? 'error' : 'default'}
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" justifyContent="center" gap={0.5}>
                            <Tooltip title="Lihat Detail & Proses">
                              <IconButton size="small" color="primary" onClick={() => { setSelectedPermohonan(row); setOpenModal(true); }}>
                                <FontAwesomeIcon icon={faEye} size="xs" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Setujui / Selesai">
                              <IconButton size="small" color="success" onClick={() => handlePermohonanStatus(row._id, 'Selesai')} disabled={row.status === 'Selesai'}>
                                <FontAwesomeIcon icon={faCheck} size="xs" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Tolak Permohonan">
                              <IconButton size="small" color="error" onClick={() => handlePermohonanStatus(row._id, 'Ditolak')} disabled={row.status === 'Ditolak'}>
                                <FontAwesomeIcon icon={faXmark} size="xs" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {permohonanList.length === 0 && (
                      <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3 }}>Belum ada permohonan masuk</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* ISI PANEL TAB 2: KEBERATAN */}
            {activeTab === 1 && (
              <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Kode Reff / NIK</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Alasan Keberatan</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Penjelasan Kronologi</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Berkas Lampiran</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status Review</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Aksi Manajemen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keberatanList.map((row) => (
                      <TableRow key={row._id} hover>
                        <TableCell>
                          <Chip label={row.kodePermohonan} size="small" color="error" variant="outlined" sx={{ fontWeight: 700, mb: 1 }} />
                          <Typography variant="body2" color="textSecondary">{maskText(row.nik, 'nik')}</Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 250 }}>
                          {row.alasanKeberatan.map((alasan, index) => (
                            <Chip key={index} label={alasan} size="small" sx={{ m: 0.2, maxWidth: 230, fontSize: '0.75rem' }} />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 250, fontStyle: 'italic' }}>"{row.kronologi}"</Typography>
                        </TableCell>
                        <TableCell>
                          {row.fileSuratKeberatan ? (
                            <Button size="small" variant="text" href={`http://localhost:5000/images/${row.fileSuratKeberatan}`} target="_blank" rel="noreferrer">
                              Lihat Surat
                            </Button>
                          ) : "-"}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.statusKeberatan || "Dalam Tinjauan"} 
                            size="small"
                            color={row.statusKeberatan === 'Diterima' ? 'success' : row.statusKeberatan === 'Dalam Tinjauan' ? 'warning' : 'error'}
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" justifyContent="center" gap={1}>
                            <Button size="small" variant="contained" color="success" onClick={() => handleKeberatanStatus(row._id, 'Diterima')} disabled={row.statusKeberatan === 'Diterima'}>
                              Terima
                            </Button>
                            <Button size="small" variant="contained" color="error" onClick={() => handleKeberatanStatus(row._id, 'Ditolak')} disabled={row.statusKeberatan === 'Ditolak'}>
                              Tolak
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {keberatanList.length === 0 && (
                      <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3 }}>Belum ada pengajuan keberatan masuk</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {/* Modal Tinjau Form Detail Terintegrasi */}
        <AduanForm 
          open={openModal}
          onClose={() => { setOpenModal(false); setSelectedPermohonan(null); }}
          data={selectedPermohonan}
          onApprove={(id) => handlePermohonanStatus(id, 'Selesai')}
          onReject={(id) => handlePermohonanStatus(id, 'Ditolak')}
        />

      </Container>
    </Box>
  );
};