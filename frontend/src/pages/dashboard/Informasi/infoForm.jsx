import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, MenuItem, Grid } from '@mui/material';

export default function InfoForm({ initialData, onSubmit, onCancel, defaultKategori }) {
  const [formData, setFormData] = useState({
    kategori: defaultKategori || '',
    sub_kategori: '',
    judul: '',
    ringkasan_informasi: '',
    unit_menguasai: '',
    penanggung_jawab: '',
    tahun: new Date().getFullYear(),
    retensi_arsip: 'Selama Berlaku',
    file_url: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        kategori: initialData.kategori || '',
        sub_kategori: initialData.sub_kategori || '',
        judul: initialData.judul || '',
        ringkasan_informasi: initialData.ringkasan_informasi || '',
        unit_menguasai: initialData.unit_menguasai || '',
        penanggung_jawab: initialData.penanggung_jawab || '',
        tahun: initialData.tahun || new Date().getFullYear(),
        retensi_arsip: initialData.retensi_arsip || 'Selama Berlaku',
        file_url: initialData.file_url || ''
      });
    } else {
      setFormData(prev => ({ ...prev, kategori: defaultKategori }));
    }
  }, [initialData, defaultKategori]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        
        {/* Dropdown Kategori Koleksi (Wajib Diisi agar backend tahu target tabel) */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Kategori Informasi (Koleksi)"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            required
            disabled={!!initialData}
          >
            <MenuItem value="publik">1. Informasi Publik</MenuItem>
            <MenuItem value="serta_merta">2. Informasi Serta Merta</MenuItem>
            <MenuItem value="setiap_saat">3. Informasi Setiap Saat</MenuItem>
            <MenuItem value="dikecualikan">4. Informasi Dikecualikan</MenuItem>
            <MenuItem value="berkala">5. Informasi Berkala</MenuItem>
          </TextField>
        </Grid>

        {/* Input Sub-Kategori (Misal: Profil, Program Kerja, Keuangan) */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Sub Kategori (Kelompok Tabel)"
            name="sub_kategori"
            value={formData.sub_kategori}
            onChange={handleChange}
            placeholder="Contoh: Profil / Keuangan"
            required
          />
        </Grid>

        {/* Input Judul Informasi */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Judul Informasi"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Input Ringkasan Informasi */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ringkasan Isi Informasi"
            name="ringkasan_informasi"
            value={formData.ringkasan_informasi}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Input Unit yang Menguasai */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Unit Yang Menguasai Informasi"
            name="unit_menguasai"
            value={formData.unit_menguasai}
            onChange={handleChange}
            placeholder="Contoh: Sekretariat / Bidang PPID"
            required
          />
        </Grid>

        {/* Input Penanggung Jawab */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Penanggung Jawab Pembuatan Informasi"
            name="penanggung_jawab"
            value={formData.penanggung_jawab}
            onChange={handleChange}
            placeholder="Contoh: Kepala Dinas / Kabid"
            required
          />
        </Grid>

        {/* Input Tahun */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Tahun"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Input Retensi Arsip */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Retensi Arsip"
            name="retensi_arsip"
            value={formData.retensi_arsip}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Input File URL / Google Drive Link */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="URL Link File Dokumen (Download)"
            name="file_url"
            value={formData.file_url}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            required
          />
        </Grid>

      </Grid>

      {/* Tombol Aksi Form */}
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Batal
        </Button>
        <Button variant="contained" color="primary" type="submit" sx={{ bgcolor: '#1d7edb' }}>
          {initialData ? 'Simpan Perubahan' : 'Tambah Data'}
        </Button>
      </Stack>
    </form>
  );
}