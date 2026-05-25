import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Card, 
  CardContent, 
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Pagination
} from "@mui/material";
import { ArrowRight, FileText, X } from "lucide-react";

const InfoCard = ({ title, year, desc, onClick }) => (
  <Card 
    onClick={onClick}
    variant="outlined" 
    sx={{ 
      width: '400px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 6, 
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
      border: '1px solid #eee',
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
    <CardContent sx={{ p: 4, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Menampilkan Judul Konten */}
      <Typography 
        className="text-target"
        sx={{ 
          fontWeight: 800, 
          mb: 1, 
          color: "#001d3d", 
          fontSize: "1.8rem",
          lineHeight: 1.2,
          transition: '0.3s'
        }}
      >
        {title}
      </Typography>

      {/* Menampilkan Label Tahun secara Jelas pada Kartu */}
      <Typography 
        className="text-target"
        sx={{ 
          fontWeight: 'bold', 
          color: '#131313', 
          fontSize: '1.3rem', 
          mb: 2,
          transition: '0.3s'
        }}
      >
        Tahun {year}
      </Typography>

      <Typography 
        className="text-target"
        sx={{ 
          color: "#666", 
          mb: 4, 
          fontSize: "1.2rem",
          lineHeight: 1.6,
          minHeight: '60px',
          transition: '0.3s',
          maxWidth: '85%' 
        }}
      >
        {desc}
      </Typography>

      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={1}
        className="text-target"
        sx={{ color: "#1d7edb", fontWeight: "bold", transition: '0.3s', mt: 'auto' }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Selengkapnya</Typography>
        <ArrowRight size={20} />
      </Stack>

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

export const Selalu = (props) => {
  const [listSelalu, setListSelalu] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [page, setPage] = useState(1); 
  const itemsPerPage = 9; 

  useEffect(() => {
    const fetchSelaluData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/informasi");
        if (!response.ok) throw new Error("Gagal mengambil data dari server");
        
        const result = await response.json();
        
        if (result.success) {
          const selaluItems = result.data.filter(item => item.kategori === 'setiap_saat');
          const sortedItems = selaluItems.sort((a, b) => b.tahun - a.tahun);
          setListSelalu(sortedItems);
        } else {
          throw new Error(result.message || "Terjadi kesalahan");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSelaluData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 420, behavior: 'smooth' });
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = listSelalu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(listSelalu.length / itemsPerPage);

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
            Informasi Setiap Saat
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "850px", fontSize: "1.3rem", textTransform: "none", lineHeight: 1.6 }}>
            Portal Informasi Setiap Saat Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah. Temukan data, laporan, dan dokumen terkait informasi yang wajib dipublikasikan setiap saat sesuai peraturan perundang-undangan.
            Sesuai Pasal 11 Undang-Undang Nomor 14 Tahun 2008 mengenai Keterbukaan Informasi Publik, 
            Badan Publik wajib menyediakan Informasi Publik setiap saat yang dapat diakses oleh Pengguna Informasi Publik.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: -10, pb: 10, position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', borderRadius: 6, p: { xs: 3, md: 6 }, boxShadow: "0 15px 40px rgba(0,0,0,0.12)", position: 'relative'}}>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {!loading && error && (
            <Typography variant="body1" color="error" textAlign="center" sx={{ py: 3 }}>
              Gagal memuat data: {error}
            </Typography>
          )}

          {!loading && !error && listSelalu.length === 0 && (
            <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ py: 3 }}>
              Belum ada data Informasi Setiap Saat.
            </Typography>
          )}

          {/* Grid Render Kartu per Data dari Database */}
          {!loading && !error && currentCards.length > 0 && (
            <>
              <Grid container spacing={4}>
                {currentCards.map((item) => (
                  <Grid item xs={12} md={6} lg={4} key={item._id} sx={{ display: 'flex' }}>
                    <InfoCard 
                      title={item.judul} 
                      year={item.tahun}
                      desc={item.ringkasan_informasi} 
                      onClick={() => handleCardClick(item)}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Navigasi Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size="large"
                    shape="rounded"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontWeight: 'bold',
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Card>
      </Container>

      {/* MODAL POP-UP DETAIL DOKUMEN TUNGGAL */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 4, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#001d3d", pr: 6 }}>
          Detail Berkas Dokumen
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 16, top: 16, color: '#666' }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedItem && (
            <List>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => window.open(selectedItem.file_url, '_blank')}
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid #e0e0e0',
                    p: 2,
                    transition: '0.2s',
                    '&:hover': {
                      bgcolor: '#f0f7ff',
                      borderColor: '#1d7edb',
                      color: '#1d7edb'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <FileText size={26} />
                  </ListItemIcon>
                  
                  {/* UKURAN FONT DI-CUSTOM LEBIH BESAR SESUAI REQUEST */}
                  <ListItemText 
                    primary={`Berkas ${selectedItem.judul}`} 
                    secondary={`Tahun ${selectedItem.tahun}`}
                    primaryTypographyProps={{ 
                      fontWeight: 'bold',
                      fontSize: '1.9rem' 
                    }}
                    secondaryTypographyProps={{
                      fontSize: '1.7rem',
                      fontWeight: 'bold',
                      color: '#1d7edb',
                      mt: 0.5
                    }}
                  />
                  <ArrowRight size={22} />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};