import React, { useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Grid, 
  TextField, Button, Box, FormControl, FormGroup, FormControlLabel, Checkbox 
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import API from "../api/axiosInstance";

export const ModalKeberatan = ({ open, onClose }) => {
  const [formKeberatan, setFormKeberatan] = useState({ kodePermohonan: "", nik: "", kronologi: "" });
  const [alasanTerpilih, setAlasanTerpilih] = useState([]);
  const [fileSuratKeberatan, setFileSuratKeberatan] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedId, setVerifiedId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormKeberatan((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAlasanTerpilih((prev) => [...prev, value]);
    } else {
      setAlasanTerpilih((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleCekValidasiPermohonan = async () => {
    if (!formKeberatan.kodePermohonan || !formKeberatan.nik) {
      alert("Masukkan Kode Permohonan dan NIK Anda terlebih dahulu!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/keberatan/cek-validasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kodePermohonan: formKeberatan.kodePermohonan,
          nik: formKeberatan.nik
        })
      });
      const result = await response.json();

      if (response.ok && result.success) {
        alert(`${result.message}\nPermohonan ditemukan atas nama: ${result.namaPemohon}`);
        setVerifiedId(result.permohonanId);
        setIsVerified(true);
      } else {
        alert(result.message || "Data permohonan tidak cocok atau tidak ditemukan.");
        setIsVerified(false);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung dengan server validasi.");
    }
  };

  const handleSubmitKeberatan = async () => {
  if (alasanTerpilih.length === 0 || !formKeberatan.kronologi) {
    alert("Mohon isi alasan keberatan dan kronologi kasus secara lengkap!");
    return;
  }
  if (!fileSuratKeberatan) {
    alert("Berkas fisik surat keberatan wajib diunggah!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("permohonanId", verifiedId);
    formData.append("kodePermohonan", formKeberatan.kodePermohonan);
    formData.append("nik", formKeberatan.nik);
    formData.append("kronologi", formKeberatan.kronologi);
    formData.append("fileSuratKeberatan", fileSuratKeberatan);
    formData.append("alasanKeberatan", JSON.stringify(alasanTerpilih));

    const response = await API.post("/keberatan", formData);
    
    const result = response.data;

    if (result.success) {
      alert(result.message);
      onClose();
      
      setFormKeberatan({ kodePermohonan: "", nik: "", kronologi: "" });
      setAlasanTerpilih([]);
      setFileSuratKeberatan(null);
      setIsVerified(false);
      setVerifiedId("");
    } else {
      alert(result.message || "Gagal mengajukan keberatan.");
    }
  } catch (error) {
    console.error("Error Axios Keberatan:", error);
    
    if (error.response && error.response.data) {
      alert(`Gagal: ${error.response.data.message || "Terjadi kesalahan pada server."}`);
    } else {
      alert("Terjadi kesalahan jaringan atau server tidak merespons.");
    }
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#0d235c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Form Pengajuan Keberatan Informasi</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>VALIDASI PERMOHONAN</Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth size="small" label="KODE PERMOHONAN" name="kodePermohonan" value={formKeberatan.kodePermohonan} onChange={handleInputChange} disabled={isVerified} placeholder="Masukan Kode Permohonan Anda" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={handleCekValidasiPermohonan} disabled={isVerified} sx={{ bgcolor: '#0d235c', height: '40px', fontSize: '0.9rem', fontWeight: 600 }}>
              {isVerified ? "TERVERIFIKASI" : "CEK DATA"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="NIK" name="nik" value={formKeberatan.nik} onChange={handleInputChange} disabled={isVerified} placeholder="Masukan Nomor NIK Anda" required />
          </Grid>
        </Grid>

        {isVerified && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#0d235c' }}>ALASAN PENGAJUAN KEBERATAN</Typography>
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormGroup>
                {[
                  "Penolakan atas permintaan informasi berdasarkan alasan pengecualian sebagaimana dimaksud dalam Pasal 17 UU No. 14 Tahun 2008",
                  "Tidak disediakannya informasi berkala",
                  "Tidak ditanggapinya permintaan informasi",
                  "Permintaan informasi tidak ditanggapi sebagaimana yang diminta",
                  "Tidak dipenuhinya permintaan informasi",
                  "Pengenaan biaya yang tidak wajar",
                  "Penyampaian informasi yang melebihi jangka waktu yang diatur dalam UU No. 14 Tahun 2008"
                ].map((alasanTxt, index) => (
                  <FormControlLabel key={index} control={<Checkbox size="small" value={alasanTxt} onChange={handleCheckboxChange} />} label={<Typography variant="body1">{alasanTxt}</Typography>} sx={{ mb: 1 }} />
                ))}
              </FormGroup>
            </FormControl>

            <TextField fullWidth size="small" label="KRONOLOGI ( PENJELASAN KEBERATAN )" name="kronologi" value={formKeberatan.kronologi} onChange={handleInputChange} multiline rows={3} placeholder="Masukan Kronologi ( Penjelasan Keberatan )" sx={{ mb: 3 }} required />

            <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>UPLOAD SURAT KEBERATAN *</Typography>
            <label htmlFor="keberatan-surat-file">
              <input type="file" id="keberatan-surat-file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFileSuratKeberatan(e.target.files[0])} />
              <div className="upload-zone" style={{ marginBottom: '24px' }}>
                <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '24px', color: '#1d7edb', marginBottom: '8px' }} />
                <Typography variant="body1">
                  {fileSuratKeberatan ? `Terpilih: ${fileSuratKeberatan.name}` : "Upload Surat Keberatan Max Upload 5 Mb"}
                </Typography>
              </div>
            </label>

            <Button fullWidth variant="contained" onClick={handleSubmitKeberatan} sx={{ bgcolor: '#0d235c', '&:hover': { bgcolor: '#112d75' }, fontWeight: 700, py: 1 }}>
              AJUKAN KEBERATAN
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};