import React, { useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Grid, 
  FormControl, InputLabel, Select, MenuItem, TextField, Box, 
  RadioGroup, FormControlLabel, Radio, Button 
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import API from "../api/axiosInstance";

export const ModalPermohonan = ({ open, onClose }) => {
  const [kategoriPermohonan, setKategoriPermohonan] = useState("Perorangan");
  const [formPermohonan, setFormPermohonan] = useState({
    nikIdentitas: "",
    namaPemohon: "",
    alamat: "",
    email: "",
    nomorTelepon: "",
    pekerjaan: "",
    rincianInformasi: "",
    tujuanPenggunaan: "",
    caraMemperolehInformasi: "Melihat",
    mendapatkanSalinan: "Softcopy",
    caraMendapatkanSalinan: "Email"
  });
  const [fileKtp, setFileKtp] = useState(null);
  const [fileDokumenTambahan, setFileDokumenTambahan] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPermohonan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (!formPermohonan.nikIdentitas || !formPermohonan.namaPemohon || !formPermohonan.alamat || !formPermohonan.email || !formPermohonan.nomorTelepon || !formPermohonan.rincianInformasi || !formPermohonan.tujuanPenggunaan) {
    alert("Mohon lengkapi semua kolom data permohonan yang wajib diisi!");
    return;
  }
  if (!fileKtp) {
    alert("Berkas file KTP wajib diunggah!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("kategoriPermohonan", kategoriPermohonan);
    formData.append("fileKtp", fileKtp);
    if (fileDokumenTambahan) {
      formData.append("fileDokumenTambahan", fileDokumenTambahan);
    }

    Object.keys(formPermohonan).forEach((key) => {
      formData.append(key, formPermohonan[key]);
    });

    const response = await API.post("/permohonan", formData);

    const result = response.data;

    if (result.success) {
      alert(`${result.message}\n\nKODE PERMOHONAN ANDA: ${result.data.kodePermohonan}\n(Simpan kode ini baik-baik untuk pengajuan keberatan jika diperlukan)`);
      onClose();
      
      setFormPermohonan({
        nikIdentitas: "", namaPemohon: "", alamat: "", email: "", nomorTelepon: "",
        pekerjaan: "", rincianInformasi: "", tujuanPenggunaan: "",
        caraMemperolehInformasi: "Melihat", mendapatkanSalinan: "Softcopy", caraMendapatkanSalinan: "Email"
      });
      setFileKtp(null);
      setFileDokumenTambahan(null);
    } else {
      alert(result.message || "Gagal mengirim permohonan.");
    }
  } catch (error) {
    console.error("Error Axios:", error);
    
    if (error.response && error.response.data) {
      alert(`Gagal: ${error.response.data.message || "Terjadi kesalahan pada server."}`);
    } else {
      alert("Terjadi kesalahan jaringan atau server tidak merespons.");
    }
  }
};
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#0d235c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Form Permohonan Informasi Publik</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* KOLOM KIRI: DATA PEMOHON */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>DATA PEMOHON</Typography>
            
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel id="kategori-label">Kategori Permohonan</InputLabel>
              <Select 
                labelId="kategori-label" 
                label="Kategori Permohonan" 
                value={kategoriPermohonan}
                onChange={(e) => setKategoriPermohonan(e.target.value)}
              >
                <MenuItem value="Perorangan">Perorangan</MenuItem>
                <MenuItem value="Lembaga">Lembaga / Organisasi</MenuItem>
                <MenuItem value="Kelompok">Kelompok Orang</MenuItem>
              </Select>
            </FormControl>

            <TextField 
              fullWidth size="small" name="nikIdentitas" value={formPermohonan.nikIdentitas} onChange={handleInputChange}
              label={kategoriPermohonan === "Perorangan" ? "NIK / NO.IDENTITAS PRIBADI" : kategoriPermohonan === "Lembaga" ? "NIK / NO.IDENTITAS PIMPINAN" : "NIK / NO.IDENTITAS PEMBERI KUASA"}
              helperText="( Mohon pastikan NIK yang anda masukan sesuai dengan no NIK KTP )"
              FormHelperTextProps={{ sx: { color: '#e74c3c', fontWeight: 500 } }} sx={{ mb: 2 }} required 
            />

            <TextField 
              fullWidth size="small" name="namaPemohon" value={formPermohonan.namaPemohon} onChange={handleInputChange}
              label={kategoriPermohonan === "Perorangan" ? "NAMA LENGKAP" : kategoriPermohonan === "Lembaga" ? "NAMA LEMBAGA / ORGANISASI" : "NAMA KELOMPOK ORANG"}
              placeholder={kategoriPermohonan === "Perorangan" ? "Masukkan Nama Lengkap Anda" : kategoriPermohonan === "Lembaga" ? "Masukkan Nama Lembaga / Organisasi Anda" : "Masukkan Nama Kelompok Orang"}
              sx={{ mb: 2 }} required 
            />
            
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem', color: '#2d3436' }}>
              {kategoriPermohonan === "Perorangan" ? "UPLOAD KTP PRIBADI *" : kategoriPermohonan === "Lembaga" ? "UPLOAD KTP PIMPINAN *" : "UPLOAD KTP PEMBERI KUASA *"}
            </Typography>
            <label htmlFor="permohonan-ktp-file">
              <input type="file" id="permohonan-ktp-file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFileKtp(e.target.files[0])} />
              <div className="upload-zone" style={{ marginBottom: '16px' }}>
                <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                  {fileKtp ? `Terpilih: ${fileKtp.name}` : "Upload File KTP Max Upload 2 Mb"}
                </Typography>
              </div>
            </label>

            <TextField fullWidth size="small" label="ALAMAT" name="alamat" value={formPermohonan.alamat} onChange={handleInputChange} multiline rows={3} sx={{ mb: 2 }} required />
            <TextField fullWidth size="small" label="EMAIL" name="email" type="email" value={formPermohonan.email} onChange={handleInputChange} sx={{ mb: 2 }} required />
            <TextField fullWidth size="small" label="NOMOR TELEPON" name="nomorTelepon" value={formPermohonan.nomorTelepon} onChange={handleInputChange} sx={{ mb: 2 }} required />
            <TextField fullWidth size="small" label="PEKERJAAN" name="pekerjaan" value={formPermohonan.pekerjaan} onChange={handleInputChange} sx={{ mb: 2 }} />
          </Grid>

          {/* KOLOM KANAN: DETAIL PERMOHONAN */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>DETAIL PERMOHONAN</Typography>
            
            {kategoriPermohonan === "Lembaga" && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>UPLOAD AKTA NOTARIS LEMBAGA / ORGANISASI</Typography>
                <label htmlFor="permohonan-akta-file">
                  <input type="file" id="permohonan-akta-file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFileDokumenTambahan(e.target.files[0])} />
                  <div className="upload-zone">
                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      {fileDokumenTambahan ? `Terpilih: ${fileDokumenTambahan.name}` : "Upload File Akta Notaris Max Upload 5 Mb"}
                    </Typography>
                  </div>
                </label>
              </Box>
            )}

            {kategoriPermohonan === "Kelompok" && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>UPLOAD SURAT KUASA</Typography>
                <label htmlFor="permohonan-kuasa-file">
                  <input type="file" id="permohonan-kuasa-file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFileDokumenTambahan(e.target.files[0])} />
                  <div className="upload-zone">
                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      {fileDokumenTambahan ? `Terpilih: ${fileDokumenTambahan.name}` : "Upload File Surat Kuasa Max Upload 5 Mb"}
                    </Typography>
                  </div>
                </label>
              </Box>
            )}

            <TextField fullWidth size="small" label="RINCIAN INFORMASI" name="rincianInformasi" value={formPermohonan.rincianInformasi} onChange={handleInputChange} multiline rows={3} sx={{ mb: 2 }} required />
            <TextField fullWidth size="small" label="TUJUAN PENGGUNAAN INFORMASI" name="tujuanPenggunaan" value={formPermohonan.tujuanPenggunaan} onChange={handleInputChange} multiline rows={3} sx={{ mb: 2 }} required />
            
            <FormControl component="fieldset" sx={{ mb: 1.5, display: 'block' }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>CARA MEMPEROLEH INFORMASI</Typography>
              <RadioGroup row name="caraMemperolehInformasi" value={formPermohonan.caraMemperolehInformasi} onChange={handleInputChange}>
                <FormControlLabel value="Melihat" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Melihat</Typography>} />
                <FormControlLabel value="Membaca" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Membaca</Typography>} />
                <FormControlLabel value="Mendengarkan" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mendengarkan</Typography>} />
                <FormControlLabel value="Mencatat" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mencatat</Typography>} />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 1.5, display: 'block' }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>MENDAPATKAN SALINAN INFORMASI</Typography>
              <RadioGroup row name="mendapatkanSalinan" value={formPermohonan.mendapatkanSalinan} onChange={handleInputChange}>
                <FormControlLabel value="Softcopy" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Softcopy</Typography>} />
                <FormControlLabel value="Hardcopy" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Hardcopy</Typography>} />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3, display: 'block' }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>CARA MENDAPATKAN SALINAN INFORMASI</Typography>
              <RadioGroup row name="caraMendapatkanSalinan" value={formPermohonan.caraMendapatkanSalinan} onChange={handleInputChange}>
                <FormControlLabel value="Mengambil Langsung" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mengambil Langsung</Typography>} />
                <FormControlLabel value="Faksimili" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Faksimili</Typography>} />
                <FormControlLabel value="Email" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Email</Typography>} />
              </RadioGroup>
            </FormControl>

            <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#0d235c', '&:hover': { bgcolor: '#112d75' }, fontWeight: 700, py: 1 }}>
              AJUKAN PERMOHONAN
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};