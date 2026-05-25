import React, { useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Stack, Typography, Grid, Divider
} from '@mui/material';
import { updateStatusPermohonan } from './aduanService';

export const AduanForm = ({ open, onClose, data, onApprove, onReject }) => {
  
  // Efek transisi otomatis mengubah berkas baru (Pending) menjadi (Diproses) saat dibuka admin
  useEffect(() => {
    if (open && data && data.status === 'Pending') {
      updateStatusPermohonan(data._id, 'Diproses').catch((err) => 
        console.error("Gagal memperbarui status ke Diproses:", err)
      );
      data.status = 'Diproses'; // Sinkronisasi bayangan visual lokal sebelum refresh instan
    }
  }, [open, data]);

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#2c3e50', color: 'white', fontWeight: 700 }}>
        Detail Berkas Permohonan — {data.kodePermohonan}
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>PROFIL PEMOHON</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography variant="body2"><strong>Kategori:</strong> {data.kategoriPermohonan}</Typography>
              <Typography variant="body2"><strong>Nama Pemohon:</strong> {data.namaPemohon}</Typography>
              <Typography variant="body2"><strong>NIK Identitas:</strong> {data.nikIdentitas}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {data.email}</Typography>
              <Typography variant="body2"><strong>No. HP / Telepon:</strong> {data.nomorTelepon}</Typography>
              <Typography variant="body2"><strong>Pekerjaan:</strong> {data.pekerjaan || '-'}</Typography>
              <Typography variant="body2"><strong>Alamat Lengkap:</strong> {data.alamat}</Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>PERMINTAAN INFORMASI</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography variant="body2"><strong>Rincian Informasi:</strong></Typography>
              <Typography variant="body2" sx={{ bgcolor: '#f8f9fa', p: 1.5, borderRadius: 1.5, border: '1px solid #e0e0e0', fontStyle: 'italic' }}>
                "{data.rincianInformasi}"
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Tujuan Penggunaan:</strong></Typography>
              <Typography variant="body2" sx={{ bgcolor: '#f8f9fa', p: 1.5, borderRadius: 1.5, border: '1px solid #e0e0e0', fontStyle: 'italic' }}>
                "{data.tujuanPenggunaan}"
              </Typography>
              
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2"><strong>Cara Memperoleh:</strong> {data.caraMemperolehInformasi}</Typography>
              <Typography variant="body2"><strong>Bentuk Salinan:</strong> {data.mendapatkanSalinan}</Typography>
              <Typography variant="body2"><strong>Pengiriman Salinan:</strong> {data.caraMendapatkanSalinan}</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mb: 1.5 }} />
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, mb: 1 }}>LAMPIRAN VERIFIKASI BERKAS</Typography>
            <Stack direction="row" spacing={2}>
              {data.fileKtp ? (
                <Button variant="outlined" size="small" href={`http://localhost:5000${data.fileKtp}`} target="_blank" rel="noreferrer">
                  Lihat KTP Pemohon
                </Button>
              ) : (
                <Typography variant="caption" color="error">Berkas KTP tidak terlampir</Typography>
              )}
              
              {data.fileDokumenTambahan && (
                <Button variant="outlined" size="small" color="secondary" href={`http://localhost:5000/images/${data.fileDokumenTambahan}`} target="_blank" rel="noreferrer">
                  Lihat Dokumen Penunjang / Kuasa
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
        <Button variant="outlined" onClick={onClose} sx={{ color: '#7f8c8d' }}>Tutup</Button>
        {/* Tombol aksi aktif jika status permohonan belum berkategori final (Selesai/Ditolak) */}
        {(data.status === 'Pending' || data.status === 'Diproses') && (
          <>
            <Button variant="contained" color="error" onClick={() => { onReject(data._id); onClose(); }}>Tolak Berkas</Button>
            <Button variant="contained" color="success" onClick={() => { onApprove(data._id); onClose(); }}>Validasi Selesai</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};