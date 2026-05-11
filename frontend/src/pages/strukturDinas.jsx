import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Tooltip, 
  Collapse,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const s = {
    wrapper: {
      backgroundColor: "#F4F7F9",
      minHeight: "100vh",
      padding: "120px 20px 50px 20px",
      fontFamily: "'Source Sans 3', sans-serif",
      color: "#2C3E50",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    }
};
const OrgNode = styled(Paper)(({ theme, level }) => ({
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `2px solid ${theme.palette.primary.main}`,
  fontWeight: 'bold',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
  ...(level === 'head' && {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  }),
  ...(level === 'sub' && {
    borderStyle: 'dashed',
    fontSize: '1.2rem',
  })
}));

export const StrukturDinas = () => {
  const [expanded, setExpanded] = useState(true);

  return (
     <div style={s.wrapper}>
        <div style={s.container}>
        <div style={s.headerLogos}>
          <img src="/img/jateng.png" alt="Jateng" style={{ height: "70px" }} />
          <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
          <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
        </div>
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        STRUKTUR ORGANISASI DISNAKERTRANS PROVINSI JAWA TENGAH
      </Typography>
      
      {/* 1. Kepala Dinas */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 2 }}>
        <Tooltip title="Pimpinan Tertinggi" arrow>
          <OrgNode level="head" sx={{ width: 250 }}>KEPALA DINAS</OrgNode>
        </Tooltip>
      </Box>
      <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 2 }}>
        {/* 2. Sekretariat & Sub Bagian */}
        <Grid item xs={12} md={10}>
          <OrgNode level="sub" sx={{ mb: 2, backgroundColor: '#e3f2fd' }}>
            SEKRETARIAT
          </OrgNode>
          <Grid container spacing={2}>
            {['SUB BAGIAN PROGRAM', 'SUB BAGIAN KEUANGAN', 'SUB BAGIAN UMUM & KEPEGAWAIAN'].map((text) => (
              <Grid item xs={4} key={text}>
                <OrgNode level="sub" sx={{ fontSize: '1.4rem' }}>{text}</OrgNode>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* 3. Bidang-Bidang Utama */}
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            
            {/* Bidang 1 */}
            <Grid item xs={12} sm={3}>
              <OrgNode sx={{ mb: 1, height: 80 }}>BIDANG PELATIHAN KERJA & PRODUKTIVITAS</OrgNode>
              {['Seksi Pelatihan & Pemagangan', 'Seksi Standarisasi & Sertifikasi', 'Seksi Produktivitas'].map(s => (
                <Paper key={s} sx={{ p: 1, mb: 0.5, fontSize: '1.2rem', bgcolor: '#fff' }}>{s}</Paper>
              ))}
            </Grid>

            {/* Bidang 2 */}
            <Grid item xs={12} sm={3}>
              <OrgNode sx={{ mb: 1, height: 80 }}>BIDANG PENEMPATAN TENAGA KERJA & TRANSMIGRASI</OrgNode>
              {['Seksi Penempatan Tenaga Kerja', 'Seksi Perluasan Kesempatan Kerja', 'Seksi Transmigrasi'].map(s => (
                <Paper key={s} sx={{ p: 1, mb: 0.5, fontSize: '1.2rem', bgcolor: '#fff' }}>{s}</Paper>
              ))}
            </Grid>

            {/* Bidang 3 */}
            <Grid item xs={12} sm={3}>
              <OrgNode sx={{ mb: 1, height: 80 }}>BIDANG HUBUNGAN INDUSTRIAL & JAMINAN SOSIAL</OrgNode>
              {['Seksi Syarat Kerja & Jamsos', 'Seksi Kelembagaan & HI', 'Seksi Pengupahan & Kesejahteraan'].map(s => (
                <Paper key={s} sx={{ p: 1, mb: 0.5, fontSize: '1.2rem', bgcolor: '#fff' }}>{s}</Paper>
              ))}
            </Grid>

            {/* Bidang 4 */}
            <Grid item xs={12} sm={3}>
              <OrgNode sx={{ mb: 1, height: 80 }}>BIDANG PENGAWASAN KETENAGAKERJAAN</OrgNode>
              {['Seksi Pengawasan Norma Kerja', 'Seksi Pengawasan Norma K3', 'Seksi Penegakan Hukum'].map(s => (
                <Paper key={s} sx={{ p: 1, mb: 0.5, fontSize: '1.2rem', bgcolor: '#fff' }}>{s}</Paper>
              ))}
            </Grid>

          </Grid>
        </Grid>
      </Grid>

      {/* Footer UPTD */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <OrgNode sx={{ width: 100, borderStyle: 'dotted' }}>UPTD</OrgNode>
      </Box>
    </Box>
        </div>
    </div>
  );
};
