import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Stack, Box, MenuItem 
} from '@mui/material';
import { PictureOutlined, TagOutlined } from '@ant-design/icons';

const PostForm = ({ open, onClose, onSave, selectedData }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'Admin', 
    category: 'Berita',
    content: '',
    tags: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (selectedData) {
      setFormData({
        ...selectedData,
        content: Array.isArray(selectedData.content) ? selectedData.content.join('\n') : selectedData.content,
        tags: Array.isArray(selectedData.tags) ? selectedData.tags.join(', ') : selectedData.tags,
      });
      setPreview(selectedData.photo?.url || null);
    } else {
      setFormData({ 
        title: '', slug: '', author: 'Admin', 
        category: 'Berita', content: '', tags: '' 
      });
      setFile(null);
      setPreview(null);
    }
  }, [selectedData, open]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('author', formData.author);
    data.append('category', formData.category);
    data.append('content', formData.content);
    data.append('tags', formData.tags); 
    
    if (file) {
      data.append('photo', file);
    }
    
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {selectedData?._id ? 'Edit Berita' : 'Buat Berita Baru'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField 
            label="Judul Berita (Title)" 
            fullWidth 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          
          <Stack direction="row" spacing={2}>
            <TextField 
              label="Slug" 
              fullWidth 
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
            />
            <TextField 
              select 
              label="Kategori" 
              sx={{ minWidth: 200 }}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <MenuItem value="Berita">Berita</MenuItem>
              <MenuItem value="Pengumuman">Pengumuman</MenuItem>
              <MenuItem value="Info">Info</MenuItem>
            </TextField>
          </Stack>

          <TextField 
            label="Penulis (Author)" 
            fullWidth 
            value={formData.author} 
            onChange={(e) => setFormData({...formData, author: e.target.value})} 
          />

          <Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PictureOutlined />}
              sx={{ mb: 1, textTransform: 'none' }}
            >
              Unggah Foto PNG
              <input type="file" hidden accept="image/png, image/jpeg" onChange={handleFileChange} />
            </Button>
            {preview && (
              <Box sx={{ mt: 1, border: '1px solid #ddd', p: 1, width: 'fit-content' }}>
                <img src={preview} alt="Preview" style={{ maxHeight: '150px', display: 'block' }} />
              </Box>
            )}
          </Box>

          <TextField 
            label="Isi Berita (Content)" 
            multiline 
            rows={6} 
            fullWidth 
            helperText="Gunakan baris baru untuk memisahkan poin konten"
            value={formData.content} 
            onChange={(e) => setFormData({...formData, content: e.target.value})} 
          />

          <TextField 
            label="Tags" 
            placeholder="Contoh: Jateng 80, Lowongan Kerja" 
            fullWidth 
            InputProps={{ startAdornment: <TagOutlined style={{ marginRight: 8, color: '#999' }} /> }}
            helperText="Pisahkan dengan koma"
            value={formData.tags} 
            onChange={(e) => setFormData({...formData, tags: e.target.value})} 
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Batal</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ px: 4 }}>
          {selectedData?._id ? 'Update Berita' : 'Tambah Artikel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;