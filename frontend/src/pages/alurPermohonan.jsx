import React from 'react';
import { 
  Box, 
  Typography,
  Paper, 
  Grid,
  Container
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const AlurPermohonan = () => {
  const imagePath = "/img/alurInformasi.png";

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
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
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, color: 'white', fontSize: { xs: "2.3rem", md: "4rem" }, lineHeight: 1.1 }}>
            Alur Permohonan Informasi
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "800px", fontSize: "1.2rem", textTransform: "none", lineHeight: 1.6 }}>
            Silakan pelajari bagan alur di bawah ini untuk memahami alur layanan informasi publik di Dinas Tenaga Kerja dan Transmigrasi, serta pastikan Anda telah melengkapi berkas persyaratan yang diperlukan.
          </Typography>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container maxWidth="md" sx={{ mt: -10, pb: 10, position: 'relative', zIndex: 2 }}>
        <Grid container justifyContent="center" sx={{ mb: 6 }}>
          <Grid 
            item 
            xs={12} 
            md={10} 
            lg={8} 
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box 
              component="img"
              src={imagePath} 
              alt="Bagan Alur Permohonan Informasi"
              sx={{
                width: '100%',
                maxHeight: '1200px',
                objectFit: 'contain',
                borderRadius: 3,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Paper 
              elevation={4} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 3, 
                backgroundColor: '#ffffff',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, borderBottom: '2px solid #f0f0f0', pb: 2 }}>
                <AssignmentIcon color="primary" sx={{ fontSize: '2.5rem' }} />
                <Typography variant="h4" fontWeight="700" color="primary.main">
                  Berkas Persyaratan
                </Typography>
              </Box>
          
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, fontSize: "1.3rem" }}>
                Berdasarkan regulasi yang berlaku, pemohon informasi wajib melampirkan dokumen identitas sesuai dengan kategori pemohon sebelum mengajukan permohonan:
              </Typography>
          
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Kategori 1 */}
                <Box>
                  <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.5rem' }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'primary.main', borderRadius: '50%' }} />
                    Pemohon Individu / Perorangan
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ pl: 3, mt: 1, fontSize: '1.3rem', lineHeight: 1.5 }}>
                    Menyertakan kartu identitas resmi yang masih berlaku berupa <strong>KTP / SIM / Paspor</strong>.
                  </Typography>
                </Box>
          
                {/* Kategori 2 */}
                <Box>
                  <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.5rem' }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'primary.main', borderRadius: '50%'}} />
                    Pemohon Kelompok Orang
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ pl: 3, mt: 1, fontSize: '1.3rem', lineHeight: 1.5 }}>
                    Menyertakan kartu identitas berupa <strong>KTP / SIM / Paspor dari seluruh anggota kelompok</strong> yang ikut mengajukan permohonan.
                  </Typography>
                </Box>
          
                {/* Kategori 3 */}
                <Box>
                  <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.5rem' }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'primary.main', borderRadius: '50%' }} />
                    Organisasi Berbadan Hukum
                  </Typography>
                  <Box sx={{ pl: 3, mt: 1 }}>
                    <Typography variant="body1" color="text.secondary" component="div" sx={{ fontSize: '1.3rem', lineHeight: 1.6 }}>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '8px' }}>Lembar Pengesahan Badan Hukum oleh Kementerian Hukum dan HAM (<strong>Kemenkumham</strong>).</li>
                        <li style={{ marginBottom: '8px' }}><strong>KTP / SIM / Paspor</strong> perwakilan pengurus yang berwenang.</li>
                        <li>Berkas Anggaran Dasar / Anggaran Rumah Tangga (<strong>AD/ART</strong>) Organisasi.</li>
                      </ul>
                    </Typography>
                  </Box>
                </Box>
              </Box>
          
              {/* Catatan Tambahan di bagian bawah */}
              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid #f0f0f0', color: 'text.secondary' }}>
                <Typography variant="caption" display="block" sx={{ fontStyle: 'italic', lineHeight: 1.5, fontSize: "1.3rem" }}>
                  * Catatan: Pastikan seluruh dokumen hasil scan/foto terlihat jelas, tidak buram, dan dokumen identitas masih dalam masa berlaku aktif saat diunggah atau diserahkan ke Meja Informasi.
                </Typography>
              </Box>
            </Paper>
        </Grid>
    </Grid>
    </Container>
    </Box>
  );
};