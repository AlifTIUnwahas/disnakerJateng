import React, { useState, useEffect } from 'react';

// material-ui
import { 
  Box, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Stack, 
  IconButton, Tooltip, Tabs, Tab, Dialog, DialogTitle, DialogContent 
} from '@mui/material';

// Icons
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import InfoForm from './infoForm';
import { InfoService } from './infoService';

export const DashboardInformasi = () => {
  // State Utama
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentTab, setCurrentTab] = useState('publik');

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null); 
  const loadData = async () => {
      try {
        const response = await InfoService.getAllInformasi();
        setAllData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data dari database:", error);
      }
    };
    useEffect(() => {
      loadData();
    }, []);

    useEffect(() => {
      const result = allData.filter(item => item.kategori === currentTab);
      setFilteredData(result);
    }, [currentTab, allData]);

  const handleOpenCreate = () => {
    setSelectedData(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (row) => {
    setSelectedData(row);
    setOpenModal(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedData) {
        await InfoService.updateInformasi(selectedData._id, formData);
      } else {
        await InfoService.createInformasi(formData);
      }
      setOpenModal(false);
      loadData();
    } catch (error) {
      console.error("Gagal memproses data:", error);
    }
  };

  const handleDelete = async (id, kategori) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data ini dari koleksi Information ${kategori.replace('_', ' ')}?`)) {
      try {
        await InfoService.deleteInformasi(id, kategori); 
        loadData();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <Box sx={{ py: 3, minHeight: '100vh' }}>
      
      {/* Header Dashboard */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#001d3d'}}>
            Dashboard Manajemen Informasi PPID
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            startIcon={<PlusOutlined />} 
            onClick={handleOpenCreate}
          >
            Tambah Informasi
          </Button>
        </Box>
      </Stack>

      {/* Navigasi Tab - Membagi Tampilan Berdasarkan Jenis Informasi */}
      <Paper sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }} elevation={1}>
        <Tabs 
          value={currentTab} 
          onChange={(e, newValue) => setCurrentTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, '& .MuiTab-root': { fontWeight: 'bold', textTransform: 'none', fontSize: '0.95rem' } }}
        >
          <Tab label="1. Informasi Publik" value="publik" />
          <Tab label="2. Informasi Serta Merta" value="serta_merta" />
          <Tab label="3. Informasi Setiap Saat" value="setiap_saat" />
          <Tab label="4. Informasi Dikecualikan" value="dikecualikan" />
          <Tab label="5. Informasi Berkala" value="berkala" />
        </Tabs>
      </Paper>

      {/* Tabel Utama Berdasarkan Jenis Informasi */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#2B689C' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '15%' }}>Sub Kategori</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }}>Judul</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '25%' }}>Ringkasan Informasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Unit Menguasai</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Penanggung Jawab</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'center' }}>Tahun</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'center' }}>Download</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{row.sub_kategori}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{row.judul}</TableCell>
                  <TableCell variant="body2" color="textSecondary">{row.ringkasan_informasi}</TableCell>
                  <TableCell>{row.unit_menguasai}</TableCell>
                  <TableCell>{row.penanggung_jawab}</TableCell>
                  <TableCell align="center">{row.tahun}</TableCell>
                  <TableCell align="center">
                    {row.file_url ? (
                      <Button 
                        variant="outlined" 
                        size="small"
                        href={row.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </Button>
                    ) : (
                      <Typography color="textSecondary">File tidak tersedia</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="Ubah Data">
                        <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus Data">
                        <IconButton color="error" onClick={() => handleDelete(row._id, row.kategori)}>
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography color="textSecondary">
                    Tidak ada data untuk kategori <strong>Informasi {currentTab.replace('_', ' ')}</strong>.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Dialog Modal (Tambah / Edit) */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
          {selectedData ? 'Form Ubah Data Informasi' : 'Form Tambah Data Informasi'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <InfoForm 
            initialData={selectedData} 
            onSubmit={handleFormSubmit}
            onCancel={() => setOpenModal(false)}
            defaultKategori={currentTab}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};