import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuildingColumns, 
  faGavel, 
  faListCheck, 
  faCircleCheck, 
  faGears, 
  faDatabase, 
  faBoxArchive, 
  faHandHoldingHand, 
  faScaleBalanced,
  faFilePen,
  faFileCircleXmark,
  faXmark,
  faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';

export const ProfilPpid = () => {
  const [openPermohonan, setOpenPermohonan] = useState(false);
  const [openKeberatan, setOpenKeberatan] = useState(false);
  const [kategoriPermohonan, setKategoriPermohonan] = useState("Perorangan");

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* CSS Injected Styles */}
      <style>
        {`
          .ppid-interactive-content {
            font-family: 'Inter', -apple-system, sans-serif;
            color: #2d3436;
            line-height: 1.7;
          }
          .custom-card {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
            padding: 2.5rem;
            transition: all 0.3s ease;
          }
          .hero-card {
            border-left: 8px solid #1d7edb;
          }
          .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          .icon-blue { color: #1d7edb; font-size: 1.8rem; }
          .icon-red { color: #d63031; font-size: 1.5rem; }
          
          .info-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: #e1f5fe;
            color: #0288d1;
            padding: 0.7rem 1.4rem;
            border-radius: 50px;
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 1.5rem;
          }
          .task-grid-layout {
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 2rem;
          }
          .task-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .task-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
            font-size: 1.4rem;
          }
          .check-icon {
            color: #00b894;
            margin-top: 0.3rem;
          }
          .fungsi-stack {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .fungsi-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.2rem;
            border: 1px solid #dfe6e9;
            border-radius: 12px;
            transition: all 0.3s ease;
            background: #fdfdfd;
            text-decoration: none;
            color: inherit;
          }
          .fungsi-item:hover {
            background: #1d7edb;
            color: white;
            transform: translateX(10px);
            border-color: #1d7edb;
          }

          .form-ppid-card {
            background: #2B689C;
            color: #ffffff;
            border-radius: 14px;
            border: 2px solid #ffffff;
            padding: 2.5rem 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            width: 180px;
            box-sizing: border-box;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          .form-ppid-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(13, 35, 92, 0.3);
            background: #112d75;
          }
          .form-ppid-icon {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            color: #ffffff;
          }
          .form-ppid-title {
            font-size: 1.3rem;
            font-weight: 700;
            line-height: 1.4;
          }

          .upload-zone {
            border: 2px dashed #b2bec3;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            background: #fbfbfb;
            cursor: pointer;
            transition: border-color 0.2s ease;
          }
          .upload-zone:hover {
            border-color: #1d7edb;
          }

          @media (max-width: 900px) {
            .task-grid-layout { grid-template-columns: 1fr; }
          }
        `}
      </style>

      {/* Hero Section */}
      <Box sx={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/img/gedungDisnakertrans1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', pt: { xs: 15, md: 22 }, pb: { xs: 12, md: 18 }, px: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, color: 'white', fontSize: { xs: "2.5rem", md: "4rem" }, lineHeight: 1.1 }}>
            Profil PPID
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, color: 'white', fontWeight: "normal", maxWidth: "850px", textTransform: "none", fontSize: "1.2rem", lineHeight: 1.6 }}>
            Setiap Badan Publik memiliki kewajiban untuk memberikan akses informasi kepada masyarakat, sebagaimana diatur dalam Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: -8, pb: 10, position: 'relative', zIndex: 10 }}>
        <div className="ppid-interactive-content">
          
          {/* Grid Menu Pilihan Form */}
          <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'center' }} alignItems="stretch">
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" >
              <div className="form-ppid-card" onClick={() => setOpenPermohonan(true)}>
                <FontAwesomeIcon icon={faFilePen} className="form-ppid-icon" />
                <div className="form-ppid-title">Form Permohonan <br /> Informasi Publik</div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <div className="form-ppid-card" onClick={() => setOpenKeberatan(true)}>
                <FontAwesomeIcon icon={faFileCircleXmark} className="form-ppid-icon" />
                <div className="form-ppid-title">Form Pengajuan <br />Keberatan</div>
              </div>
            </Grid>
          </Grid>

          {/* ==================== MODAL: PERMOHONAN INFORMASI PUBLIK (DINAMIS) ==================== */}
          <Dialog open={openPermohonan} onClose={() => setOpenPermohonan(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: '#0d235c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Form Permohonan Informasi Publik</Typography>
              <IconButton onClick={() => setOpenPermohonan(false)} sx={{ color: 'white' }}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 4 }}>
              <Grid container spacing={4}>
                
                {/* KOLOM KIRI: DATA PEMOHON (BERUBAH BERDASARKAN KATEGORI) */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>DATA PEMOHON</Typography>
                  
                  {/* Select Kategori Permohonan */}
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

                  {/* NIK / No. Identitas Lapangan */}
                  <TextField 
                    fullWidth 
                    size="small" 
                    label={
                      kategoriPermohonan === "Perorangan" ? "NIK / NO.IDENTITAS PRIBADI" :
                      kategoriPermohonan === "Lembaga" ? "NIK / NO.IDENTITAS PIMPINAN" : "NIK / NO.IDENTITAS PEMBERI KUASA"
                    }
                    helperText={
                      kategoriPermohonan === "Perorangan" ? "( Mohon pastikan NIK yang anda masukan sesuai dengan no NIK KTP )" :
                      kategoriPermohonan === "Lembaga" ? "( Mohon pastikan NIK yang anda masukan sesuai dengan no NIK KTP )" : "( Mohon pastikan NIK yang anda masukan sesuai dengan no NIK KTP )"
                    }
                    FormHelperTextProps={{ sx: { color: '#e74c3c', fontWeight: 500 } }}
                    sx={{ mb: 2 }} 
                    required 
                  />

                  {/* Nama Lapangan */}
                  <TextField 
                    fullWidth 
                    size="small" 
                    label={
                      kategoriPermohonan === "Perorangan" ? "NAMA LENGKAP" :
                      kategoriPermohonan === "Lembaga" ? "NAMA LEMBAGA / ORGANISASI" : "NAMA KELOMPOK ORANG"
                    }
                    placeholder={
                      kategoriPermohonan === "Perorangan" ? "Masukkan Nama Lengkap Anda" :
                      kategoriPermohonan === "Lembaga" ? "Masukkan Nama Lembaga / Organisasi Anda" : "Masukkan Nama Kelompok Orang"
                    }
                    sx={{ mb: 2 }} 
                    required 
                  />
                  
                  {/* Upload Pertama (KTP) */}
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem', color: '#2d3436' }}>
                    {kategoriPermohonan === "Perorangan" ? "UPLOAD KTP PRIBADI" :
                     kategoriPermohonan === "Lembaga" ? "UPLOAD KTP PIMPINAN" : "UPLOAD KTP PEMBERI KUASA"}
                  </Typography>
                  <div className="upload-zone" style={{ marginBottom: '16px' }}>
                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      {kategoriPermohonan === "Perorangan" ? "Upload File KTP Pribadi or Drag File KTP Pribadi Max Upload 2 Mb" :
                       kategoriPermohonan === "Lembaga" ? "Upload File KTP Pimpinan or Drag File KTP Anda Max Upload 2 Mb" : "Upload File KTP Pemberi Kuasa or Drag File KTP Pemberi Kuasa Max Upload 2 Mb"}
                    </Typography>
                  </div>

                  {/* Input Alamat, Email, Telepon, Pekerjaan */}
                  <TextField fullWidth size="small" label="ALAMAT" multiline rows={3} sx={{ mb: 2 }} required />
                  <TextField fullWidth size="small" label="EMAIL" type="email" sx={{ mb: 2 }} required />
                  <TextField fullWidth size="small" label="NOMOR TELEPON" sx={{ mb: 2 }} required />
                  <TextField fullWidth size="small" label="PEKERJAAN" sx={{ mb: 2 }} />
                </Grid>

                {/* KOLOM KANAN: DETAIL PERMOHONAN & DOKUMEN TAMBAHAN */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>DETAIL PERMOHONAN</Typography>
                  
                  {/* Upload Tambahan bersyarat berdasarkan Kategori Kelompok/Lembaga */}
                  {kategoriPermohonan === "Lembaga" && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>UPLOAD AKTA NOTARIS LEMBAGA / ORGANISASI</Typography>
                      <div className="upload-zone">
                        <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>Upload File Akta Notaris Lembaga / Organisasi or Drag File File Akta Notaris Lembaga / Organisasi Max Upload 5 Mb</Typography>
                      </div>
                    </Box>
                  )}

                  {kategoriPermohonan === "Kelompok" && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>UPLOAD SURAT KUASA</Typography>
                      <div className="upload-zone">
                        <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '20px', color: '#1d7edb', marginBottom: '4px' }} />
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>Upload File Surat Kuasa or Drag File Surat Kuasa Max Upload 5 Mb</Typography>
                      </div>
                    </Box>
                  )}

                  <TextField fullWidth size="small" label="RINCIAN INFORMASI" multiline rows={3} sx={{ mb: 2 }} required />
                  <TextField fullWidth size="small" label="TUJUAN PENGGUNAAN INFORMASI" multiline rows={3} sx={{ mb: 2 }} required />
                  
                  {/* Opsi Pilihan Radio Button */}
                  <FormControl component="fieldset" sx={{ mb: 1.5, display: 'block' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>CARA MEMPEROLEH INFORMASI</Typography>
                    <RadioGroup row defaultValue="Melihat">
                      <FormControlLabel value="Melihat" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Melihat</Typography>} />
                      <FormControlLabel value="Membaca" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Membaca</Typography>} />
                      <FormControlLabel value="Mendengarkan" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mendengarkan</Typography>} />
                      <FormControlLabel value="Mencatat" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mencatat</Typography>} />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset" sx={{ mb: 1.5, display: 'block' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>MENDAPATKAN SALINAN INFORMASI</Typography>
                    <RadioGroup row defaultValue="Softcopy">
                      <FormControlLabel value="Softcopy" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Softcopy</Typography>} />
                      <FormControlLabel value="Hardcopy" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Hardcopy</Typography>} />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset" sx={{ mb: 3, display: 'block' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>CARA MENDAPATKAN SALINAN INFORMASI</Typography>
                    <RadioGroup row defaultValue="Email">
                      <FormControlLabel value="Mengambil Langsung" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Mengambil Langsung</Typography>} />
                      <FormControlLabel value="Faksimili" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Faksimili</Typography>} />
                      <FormControlLabel value="Email" control={<Radio size="small" />} label={<Typography variant="body1" sx={{fontWeight:600}}>Email</Typography>} />
                    </RadioGroup>
                  </FormControl>

                  <Button fullWidth variant="contained" sx={{ bgcolor: '#0d235c', '&:hover': { bgcolor: '#112d75' }, fontWeight: 700, py: 1 }}>
                    AJUKAN PERMOHONAN
                  </Button>
                </Grid>

              </Grid>
            </DialogContent>
          </Dialog>

          {/* ==================== MODAL: PENGAJUAN KEBERATAN ==================== */}
          <Dialog open={openKeberatan} onClose={() => setOpenKeberatan(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: '#0d235c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Form Pengajuan Keberatan Informasi</Typography>
              <IconButton onClick={() => setOpenKeberatan(false)} sx={{ color: 'white' }}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#0d235c' }}>VALIDASI PERMOHONAN</Typography>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={8}>
                  <TextField fullWidth size="small" label="KODE PERMOHONAN" placeholder="Masukan Kode Permohonan Anda" required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button fullWidth variant="contained" sx={{ bgcolor: '#0d235c', height: '40px', fontSize: '1rem', fontWeight: 600 }}>
                    CEK DATA PERMOHONAN
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth size="small" label="NIK" placeholder="Masukan Nomor NIK Anda" required />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#0d235c' }}>ALASAN PENGAJUAN KEBERATAN</Typography>
              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Penolakan atas permintaan informasi berdasarkan alasan pengecualian sebagaimana dimaksud dalam Pasal 17 UU No. 14 Tahun 2008</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Tidak disediakannya informasi berkala</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Tidak ditanggapinya permintaan informasi</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Permintaan informasi tidak ditanggapi sebagaimana yang diminta</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Tidak dipenuhinya permintaan informasi</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Pengenaan biaya yang tidak wajar</Typography>} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body1">Penyampaian informasi yang melebihi jangka waktu yang diatur dalam UU No. 14 Tahun 2008</Typography>} sx={{ mb: 1 }} />
                </FormGroup>
              </FormControl>

              <TextField fullWidth size="small" label="KRONOLOGI ( PENJELASAN KEBERATAN ) " multiline rows={3} placeholder="Masukan Kronologi ( Penjelasan Keberatan )" sx={{ mb: 3 }} required />

              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>UPLOAD SURAT KEBERATAN*</Typography>
              <div className="upload-zone" style={{ marginBottom: '24px' }}>
                <FontAwesomeIcon icon={faCloudUploadAlt} style={{ fontSize: '24px', color: '#1d7edb', marginBottom: '8px' }} />
                <Typography variant="body1">Upload Surat Keberatan or Drag File Surat Keberatan Max Upload 5 Mb</Typography>
              </div>

              <Button fullWidth variant="contained" sx={{ bgcolor: '#0d235c', '&:hover': { bgcolor: '#112d75' }, fontWeight: 700, py: 1 }}>
                AJUKAN KEBERATAN
              </Button>
            </DialogContent>
          </Dialog>

          {/* Bagian Sejarah, Landasan Hukum, Tugas & Fungsi Bawaan */}
          <div className="custom-card hero-card" style={{ marginTop: '2rem' }}>
            <div className="section-header">
              <FontAwesomeIcon icon={faBuildingColumns} className="icon-blue" />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>Sejarah & Landasan Hukum</Typography>
            </div>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.3rem' }}>
              Reformasi yang bergulir pada tahun 2008 ditandai dengan 3 (tiga) tuntutan yaitu <strong>demokratisasi, transparansi dan supremasi hukum dan Hak Asasi Manusia</strong>.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.3rem' }}>
              Adapun konsekuensi dari tuntutan reformasi tersebut di antaranya penetapan <strong>Undang-undang Republik Indonesia Nomor 14 Tahun 2008</strong> tentang Keterbukaan informasi publik yang bertujuan untuk mewujudkan tata kelola pemerintahan yang baik (<i>good governance</i>).
            </Typography>
            <div className="info-badge">
              <a href="https://drive.google.com/file/d/1a9_dv5_2IjdP1a2WTi_XXsVhSkU-1QQc/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGavel} /> Keputusan Gubernur Jawa Tengah No. 550/1 TAHUN 2013
              </a>
            </div>
          </div>
        </div>

          <div className="task-grid-layout">
            {/* Bagian 2: Tugas */}
            <div className="custom-card">
              <div className="section-header">
                <FontAwesomeIcon icon={faListCheck} className="icon-red" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Tugas PPID</Typography>
              </div>
              <ul className="task-list">
                {[
                  "Penyediaan, penyimpanan, pendokumentasian, dan pengamanan informasi.",
                  "Pelayanan informasi sesuai dengan aturan yang berlaku.",
                  "Pelayanan informasi publik yang cepat, tepat dan sederhana.",
                  "Penetapan prosedur operasional penyebarluasan informasi publik.",
                  "Pengujian konsekuensi.",
                  "Pengklasifikasian informasi dan/atau pengubahannya.",
                  "Penetapan informasi yang dikecualikan yang habis jangka waktu.",
                  "Penetapan pertimbangan tertulis atas setiap kebijakan."
                ].map((item, i) => (
                  <li key={i}>
                    <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bagian 3: Fungsi */}
            <div className="custom-card">
              <div className="section-header">
                <FontAwesomeIcon icon={faGears} className="icon-blue" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Fungsi Utama</Typography>
              </div>
              <div className="fungsi-stack">
                <FungsiItem icon={faDatabase} text="Pengelolaan Informasi" />
                <FungsiItem icon={faBoxArchive} text="Dokumentasi Arsip" />
                <FungsiItem icon={faHandHoldingHand} text="Pelayanan Informasi" />
                <FungsiItem icon={faScaleBalanced} text="Pelayanan & Penyelesaian Sengketa" />
              </div>
            </div>
          </div>
      </Container>
    </Box>
  );
};

const FungsiItem = ({ icon, text }) => (
  <div className="fungsi-item">
    <FontAwesomeIcon icon={icon} />
    <Typography sx={{ fontWeight: 600 }}>{text}</Typography>
  </div>
);