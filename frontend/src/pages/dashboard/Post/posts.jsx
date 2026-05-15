import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import { 
  Box, Typography, Button, Paper, Checkbox, Select, MenuItem, 
  TextField, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Stack, IconButton, Tooltip 
} from '@mui/material';

import PostForm from './postForm';
import { PostService }  from './postService';


import PlusOutlined from '@ant-design/icons/PlusOutlined';
import PictureOutlined from '@ant-design/icons/PictureOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';


export const DashboardPosts = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const API_URL = "http://localhost:5000/api/admin/berita";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNewsData(sortedData);
    } catch (error) {
      console.error("Gagal mengambil berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchNews();
      } catch (error) {
        alert("Gagal menghapus artikel");
      }
    }
  };


  const handleSave = async (formData) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      
      if (selectedPost && selectedPost._id) {
        // Mode Edit
        await axios.put(`${API_URL}/${selectedPost._id}`, formData, config);
      } else {
        // Mode Tambah
        await axios.post(API_URL, formData, config);
      }
      
      setModalOpen(false);
      fetchNews();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleOpenModal = (post = null) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', {
      year: 'numeric', month: 'short', day: '2-digit'
    }) + ` Pukul ${d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: '500' }}>Artikel</Typography>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
          sx={{ textTransform: 'none' }}
        >
          Buat Artikel
        </Button>
      </Stack>

      {/* Stats */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>Semua</Box> ({newsData.length})
      </Typography>

      {/* Toolbar Filter */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField size="small" placeholder="Cari Artikel" sx={{ bgcolor: 'white' }} />
          <Button variant="outlined" size="small" sx={{ borderColor: '#ccc', color: '#333' }}>Cari</Button>
        </Stack>
      </Stack>

      {/* Tabel Utama */}
      <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Judul</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Penulis</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tanggal</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} align="center">Memuat data...</TableCell></TableRow>
            ) : newsData.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      component="img"
                      src={item.photo?.url} 
                      sx={{ width: '50%', height: 'auto', objectFit: 'cover', border: '1px solid #ddd', display: item.photo?.url ? 'block' : 'none' }}
                    />
                    {!item.photo?.url && (
                      <Box sx={{ width: 45, height: 45, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PictureOutlined style={{ color: '#999' }} />
                      </Box>
                    )}
                    <Typography 
                      variant="body1" 
                      onClick={() => handleOpenModal(item)}
                      sx={{ color: '#000000', fontWeight: '600', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2 }}>
                      Dibuat
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                      {formatDate(item.date)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpenModal(item)} color="primary">
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => handleDelete(item._id)} color="error">
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Integrasi PostForm */}
      <PostForm 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSave} 
        selectedData={selectedPost} 
      />
    </Box>
  );
};