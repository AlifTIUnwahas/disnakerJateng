import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  LinearProgress,
  Badge,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import {
  Work,
  People,
  LocationOn,
  Phone,
  Email,
  Language,
  AccessTime,
  CheckCircle,
  ExpandMore,
  Star,
  TrendingUp,
  Assignment,
  Gavel,
  Groups,
  BusinessCenter,
  Map,
  School,
  HealthAndSafety,
  AccountBalance,
  ArrowForward,
  Info,
  Public,
  ContactMail,
} from "@mui/icons-material";

// Tema khusus instansi pemerintah – palet biru-hijau resmi
const theme = createTheme({
  palette: {
    primary: {
      main: "#1A5276",
      light: "#2E86C1",
      dark: "#0D3349",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1E8449",
      light: "#27AE60",
      dark: "#145A32",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F0F4F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C2833",
      secondary: "#5D6D7E",
    },
    info: { main: "#2E86C1" },
    success: { main: "#1E8449" },
    warning: { main: "#D4AC0D" },
    error: { main: "#C0392B" },
  },
  typography: {
    fontFamily: "'Noto Serif', 'Georgia', serif",
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 },
    body2: { fontFamily: "'Source Sans 3', sans-serif" },
    button: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(26,82,118,0.08)",
          transition: "box-shadow 0.25s, transform 0.25s",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(26,82,118,0.16)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'Source Sans 3', sans-serif" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.9rem",
        },
      },
    },
  },
});

// ─── DATA ───────────────────────────────────────────────────────────────────

const profilData = {
  nama: "Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah",
  singkatan: "Disnakertrans Jateng",
  tahunBerdiri: 1950,
  alamat: "Jl. Pahlawan No. 16, Semarang, Jawa Tengah 50241",
  telepon: "(024) 8311713",
  email: "disnakertrans@jatengprov.go.id",
  website: "https://disnakertrans.jatengprov.go.id",
  jamOperasional: "Senin – Jumat: 07.30 – 15.30 WIB",
  kepalaKantor: "Ahmad Aziz, S.E., M.Si.",
  visi:
    "Jawa Tengah Yang Mandiri, Maju, Sejahtera dan Lestari.",
  misi: [
    "Mewujudkan sumber daya manusia dan masyarakat Jawa Tengah yang berkualitas, beriman dan bertakwa kepada Tuhan Yang Maha Esa, cerdas, sehat, serta berbudaya.",
    "Mewujudkan perekonomian daerah yang berbasis pada potensi unggulan daerah dengan dukungan rekayasa teknologi dan berorientasi pada ekonomi kerakyatan.",
    "Menwujudkan kehidupan politik dan tata pemerintahan yang baik (good governance), demokratis, dan bertanggung jawab, didukung oleh kompetensi dan profesionalitas aparatur, bebas dari praktik korupsi, kolusi dan nepotisme (KKN), serta pengembangan jejaring",
    "Mewujudkan pengelolaan sumber daya alam dan lingkungan hidup yang optimal dengan tetap menjaga kelestarian fungsinya dalam menopang kehidupan.",
    "Mewujudkan kualitas dan kuantitas prasarana dan sarana yang menunjang pembagian wilayah, penyediaan pelayanan dasar dan pertumbuhan ekonomi daerah; dan",
    "Mewujudkan kehidupan masyarakat yang sejahtera, aman, damai, dan bersatu dalam wadah Negara Kesatuan Republik Indonesia (NKRI) didukung dengan kepastian hukum dan penegakan HAM serta kesetaraan dan keadilan gender.",
  ],
};

const statistikData = [
  { label: "Tenaga Kerja Terdaftar", nilai: "18,4 Jt", icon: People, warna: "primary", persen: 82 },
  { label: "Pelatihan Kerja", nilai: "320 BLK", icon: School, warna: "secondary", persen: 75 },
  { label: "Kasus Hubungan Industrial", nilai: "1.240", icon: Gavel, warna: "warning", persen: 60 },
  { label: "Program K3 Aktif", nilai: "4.800+", icon: HealthAndSafety, warna: "success", persen: 90 },
];

const layananData = [
  {
    judul: "Penempatan Tenaga Kerja",
    deskripsi: "Fasilitasi penempatan tenaga kerja dalam dan luar negeri, serta bursa kerja.",
    ikon: BusinessCenter,
    warna: "#1A5276",
    tags: ["AKL", "AKAD", "AKAN"],
    link: "/layanan/penempatan",
  },
  {
    judul: "Pelatihan & Sertifikasi",
    deskripsi: "Pelatihan kerja berbasis kompetensi melalui jaringan BLK di seluruh Jawa Tengah.",
    ikon: School,
    warna: "#1E8449",
    tags: ["BLK", "Sertifikasi BNSP", "Magang"],
    link: "/layanan/pelatihan",
  },
  {
    judul: "Hubungan Industrial",
    deskripsi: "Mediasi, konsiliasi, dan arbitrase perselisihan hubungan industrial.",
    ikon: Gavel,
    warna: "#7D6608",
    tags: ["PHK", "Upah", "PKB"],
    link: "/layanan/hubungan-industrial",
  },
  {
    judul: "Pengawasan Ketenagakerjaan",
    deskripsi: "Pemeriksaan norma kerja dan K3 di perusahaan sesuai perundang-undangan.",
    ikon: Assignment,
    warna: "#922B21",
    tags: ["Norma Kerja", "K3", "Inspeksi"],
    link: "/layanan/pengawasan",
  },
  {
    judul: "Transmigrasi",
    deskripsi: "Program transmigrasi umum dan swakarsa mandiri bagi keluarga transmigran.",
    ikon: Map,
    warna: "#515A5A",
    tags: ["TU", "TBS", "TSM"],
    link: "/layanan/transmigrasi",
  },
  {
    judul: "Jaminan Sosial Ketenagakerjaan",
    deskripsi: "Koordinasi kepesertaan BPJS Ketenagakerjaan dan perlindungan pekerja.",
    ikon: HealthAndSafety,
    warna: "#154360",
    tags: ["BPJS", "JHT", "JKK"],
    link: "/layanan/jaminan-sosial",
  },
];

const beritaData = [
  {
    id: 1,
    judul: "Disnakertrans Jateng Gelar Job Fair Regional 2025",
    tanggal: "12 April 2025",
    kategori: "Event",
    ringkasan:
      "Lebih dari 200 perusahaan berpartisipasi dalam Job Fair Regional yang menawarkan ribuan lowongan kerja.",
    warna: "primary",
  },
  {
    id: 2,
    judul: "Sosialisasi UMK Jawa Tengah 2025",
    tanggal: "3 Maret 2025",
    kategori: "Pengumuman",
    ringkasan:
      "Penetapan UMK 35 kabupaten/kota di Jawa Tengah tahun 2025 disosialisasikan kepada pengusaha dan serikat pekerja.",
    warna: "secondary",
  },
  {
    id: 3,
    judul: "Pelatihan Wirausaha Baru bagi Transmigran Binaan",
    tanggal: "22 Februari 2025",
    kategori: "Program",
    ringkasan:
      "Sebanyak 150 transmigran mengikuti pelatihan kewirausahaan untuk meningkatkan kemandirian ekonomi.",
    warna: "warning",
  },
];

const strukturData = [
  { jabatan: "Kepala Dinas", nama: "Ahmad Azizy, S.E., M.Si.", level: 1 },
  { jabatan: "Sekretaris Dinas", nama: "Ir. Siti Rahayu, M.T.", level: 2 },
  { jabatan: "Bid. Penempatan & Perluasan Kerja", nama: "Heru Santoso, S.E., M.M.", level: 2 },
  { jabatan: "Bid. Pelatihan & Produktivitas", nama: "Dr. Wahyu Lestari, M.Pd.", level: 2 },
  { jabatan: "Bid. Hubungan Industrial", nama: "Bambang Widodo, S.H., M.H.", level: 2 },
  { jabatan: "Bid. Transmigrasi", nama: "Yuli Astuti, S.T., M.Si.", level: 2 },
  { jabatan: "Bid. Pengawasan Ketenagakerjaan", nama: "Sigit Purnomo, S.H., M.H.", level: 2 },
];

// ─── SUB-KOMPONEN ────────────────────────────────────────────────────────────

function HeroSection() {
  const [shown, setShown] = useState(false);
  useEffect(() => { setTimeout(() => setShown(true), 100); }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0D3349 0%, #1A5276 50%, #1E8449 100%)",
        color: "#fff",
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif lingkaran */}
      {[160, 280, 420].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            right: -size / 3,
            top: -size / 4,
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />
      ))}

      <Container maxWidth="lg">
        <Fade in={shown} timeout={700}>
          <Box>
            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
              <Chip
                label="Pemerintah Provinsi Jawa Tengah"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontFamily: "'Source Sans 3', sans-serif" }}
              />
              <Chip
                label="Dinas Teknis"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
              />
            </Stack>

            <Typography variant="h3" component="h1" fontWeight={700} mb={1.5} sx={{ lineHeight: 1.2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
              Dinas Tenaga Kerja
              <br />& Transmigrasi
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, mb: 3, maxWidth: 560 }}>
              Provinsi Jawa Tengah — Melayani, Memberdayakan, Memajukan
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                component={Link}
                to="/layanan"
                sx={{
                  bgcolor: "#fff",
                  color: "#1A5276",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Lihat Layanan
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ContactMail />}
                component={Link}
                to="/kontak"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#fff",
                  "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Hubungi Kami
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

function StatCard({ data, delay = 0 }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), delay); return () => clearTimeout(t); }, [delay]);
  const Ikon = data.icon;

  return (
    <Zoom in={shown} timeout={400}>
      <Card sx={{ height: "100%", borderTop: `4px solid`, borderTopColor: `${data.warna}.main` }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="h4" fontWeight={700} color={`${data.warna}.main`}>
                {data.nilai}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {data.label}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: `${data.warna}.main`, width: 44, height: 44 }}>
              <Ikon fontSize="small" />
            </Avatar>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={data.persen}
            color={data.warna}
            sx={{ borderRadius: 4, height: 6 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Capaian {data.persen}%
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
}

function LayananCard({ layanan, delay = 0 }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), delay); return () => clearTimeout(t); }, [delay]);
  const Ikon = layanan.ikon;

  return (
    <Zoom in={shown} timeout={350}>
      <Card
        component={Link}
        to={layanan.link}
        sx={{
          height: "100%",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          "&:hover .layanan-ikon": {
            transform: "scale(1.12)",
            bgcolor: layanan.warna,
          },
          "&:hover .layanan-ikon svg": { color: "#fff" },
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1 }}>
          <Avatar
            className="layanan-ikon"
            sx={{
              bgcolor: alpha(layanan.warna, 0.1),
              width: 52,
              height: 52,
              mb: 2,
              transition: "all 0.25s",
            }}
          >
            <Ikon sx={{ color: layanan.warna, fontSize: 26 }} />
          </Avatar>
          <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
            {layanan.judul}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
            {layanan.deskripsi}
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {layanan.tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  bgcolor: alpha(layanan.warna, 0.1),
                  color: layanan.warna,
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              />
            ))}
          </Stack>
        </CardContent>
        <Box sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="caption"
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}
          >
            Selengkapnya <ArrowForward fontSize="inherit" />
          </Typography>
        </Box>
      </Card>
    </Zoom>
  );
}

function BeritaCard({ berita }) {
  const colorMap = { primary: "#1A5276", secondary: "#1E8449", warning: "#7D6608" };
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        transition: "all 0.2s",
        "&:hover": { borderColor: "primary.main", bgcolor: "primary.50" },
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 56,
          borderRadius: 4,
          bgcolor: colorMap[berita.warna] || "#1A5276",
          flexShrink: 0,
          mt: 0.5,
        }}
      />
      <Box flexGrow={1}>
        <Stack direction="row" spacing={1} mb={0.75} alignItems="center">
          <Chip label={berita.kategori} size="small" color={berita.warna} variant="outlined" sx={{ fontSize: "0.7rem", fontFamily: "'Source Sans 3', sans-serif" }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {berita.tanggal}
          </Typography>
        </Stack>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {berita.judul}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {berita.ringkasan}
        </Typography>
      </Box>
    </Paper>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
      {value === index && <Fade in timeout={400}><Box>{children}</Box></Fade>}
    </Box>
  );
}

// ─── HALAMAN UTAMA ───────────────────────────────────────────────────────────

export const ProfilDinas = () => {
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── STATISTIK ── */}
        <Container maxWidth="lg" sx={{ mt: -5, mb: 6, position: "relative", zIndex: 10 }}>
          <Grid container spacing={2.5}>
            {statistikData.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={s.label}>
                <StatCard data={s} delay={i * 100} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* ── KONTAK CEPAT ── */}
        <Box sx={{ bgcolor: "primary.main", color: "#fff", py: 2 }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.5, sm: 4 }}
              justifyContent="center"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              {[
                { icon: Phone, label: profilData.telepon },
                { icon: Email, label: profilData.email },
                { icon: AccessTime, label: profilData.jamOperasional },
              ].map(({ icon: Ic, label }) => (
                <Stack key={label} direction="row" spacing={1} alignItems="center">
                  <Ic fontSize="small" sx={{ opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* ── KONTEN UTAMA ── */}
        <Container maxWidth="lg" sx={{ py: 6 }}>

          {/* TABS NAVIGASI */}
          <Paper variant="outlined" sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{ bgcolor: "background.paper" }}
            >
              {["Profil", "Layanan", "Berita", "Struktur"].map((label, i) => (
                <Tab key={label} label={label} id={`tab-${i}`} />
              ))}
            </Tabs>
          </Paper>

          {/* ──────────── TAB: PROFIL ──────────── */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {/* Visi & Misi */}
              <Grid item xs={12} md={7}>
                <Card sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                        <Star fontSize="small" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>Visi</Typography>
                    </Stack>
                    <Alert severity="info" icon={false} sx={{ borderRadius: 2, fontStyle: "italic", fontFamily: "'Noto Serif', serif" }}>
                      "{profilData.visi}"
                    </Alert>

                    <Divider sx={{ my: 3 }} />

                    <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}>
                        <TrendingUp fontSize="small" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>Misi</Typography>
                    </Stack>
                    <List dense>
                      {profilData.misi.map((m, i) => (
                        <ListItem key={i} disableGutters sx={{ alignItems: "flex-start", py: 0.75 }}>
                          <ListItemIcon sx={{ minWidth: 32, mt: 0.3 }}>
                            <CheckCircle color="secondary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={m}
                            primaryTypographyProps={{ variant: "body2", sx: { fontFamily: "'Source Sans 3', sans-serif" } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Info & Kontak */}
              <Grid item xs={12} md={5}>
                <Card>
                  <CardContent sx={{ p: 3.5 }}>
                    <Typography variant="h6" fontWeight={700} mb={2.5}>
                      Informasi Kantor
                    </Typography>
                    {[
                      { icon: AccountBalance, label: "Nama Instansi", nilai: profilData.singkatan },
                      { icon: People, label: "Kepala Dinas", nilai: profilData.kepalaKantor },
                      { icon: AccessTime, label: "Berdiri Sejak", nilai: profilData.tahunBerdiri },
                      { icon: LocationOn, label: "Alamat", nilai: profilData.alamat },
                      { icon: Phone, label: "Telepon", nilai: profilData.telepon },
                      { icon: Email, label: "Email", nilai: profilData.email },
                      { icon: Language, label: "Website", nilai: profilData.website },
                      { icon: AccessTime, label: "Jam Kerja", nilai: profilData.jamOperasional },
                    ].map(({ icon: Ic, label, nilai }) => (
                      <Box key={label}>
                        <Stack direction="row" spacing={1.5} py={1.5} alignItems="flex-start">
                          <Ic fontSize="small" color="primary" sx={{ mt: 0.2, flexShrink: 0 }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                              {label}
                            </Typography>
                            <Typography variant="body2" fontWeight={500} sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                              {nilai}
                            </Typography>
                          </Box>
                        </Stack>
                        <Divider />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* FAQ Sekilas */}
            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Pertanyaan Umum
            </Typography>
            {[
              { q: "Bagaimana cara mendaftar pelatihan kerja?", a: "Pendaftaran pelatihan kerja dapat dilakukan melalui BLK terdekat di kabupaten/kota atau melalui portal siap kerja di website resmi kami." },
              { q: "Apa itu program transmigrasi swakarsa mandiri?", a: "Transmigrasi Swakarsa Mandiri (TSM) adalah program transmigrasi yang dibiayai secara mandiri oleh peserta dengan difasilitasi oleh pemerintah dalam hal penempatan lahan dan pembinaan." },
              { q: "Bagaimana cara melaporkan pelanggaran norma ketenagakerjaan?", a: "Laporan dapat disampaikan langsung ke bidang pengawasan ketenagakerjaan Disnakertrans, melalui surat elektronik, atau melalui mekanisme pengaduan online di website resmi." },
            ].map((item, i) => (
              <Accordion key={i} variant="outlined" sx={{ mb: 1, borderRadius: "12px !important", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body1" fontWeight={600}>{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          {/* ──────────── TAB: LAYANAN ──────────── */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              Layanan Unggulan
            </Typography>
            <Grid container spacing={3}>
              {layananData.map((l, i) => (
                <Grid item xs={12} sm={6} md={4} key={l.judul}>
                  <LayananCard layanan={l} delay={i * 80} />
                </Grid>
              ))}
            </Grid>

            <Alert severity="info" sx={{ mt: 4, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Untuk informasi lebih lanjut atau pengaduan, silakan hubungi kami melalui telepon{" "}
                <strong>{profilData.telepon}</strong> atau email{" "}
                <strong>{profilData.email}</strong>.
              </Typography>
            </Alert>
          </TabPanel>

          {/* ──────────── TAB: BERITA ──────────── */}
          <TabPanel value={tabValue} index={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight={700}>
                Berita & Pengumuman
              </Typography>
              <Button
                endIcon={<ArrowForward />}
                component={Link}
                to="/berita"
                size="small"
                sx={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Semua Berita
              </Button>
            </Stack>
            <Stack spacing={2}>
              {beritaData.map((b) => (
                <BeritaCard key={b.id} berita={b} />
              ))}
            </Stack>
          </TabPanel>

          {/* ──────────── TAB: STRUKTUR ──────────── */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              Struktur Organisasi
            </Typography>

            {/* Kepala Dinas */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Card sx={{ maxWidth: 340, width: "100%", border: "2px solid", borderColor: "primary.main" }}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Badge
                    badgeContent={<Star sx={{ fontSize: 14 }} />}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: 24, mx: "auto", mb: 1.5 }}>
                      {strukturData[0].nama[0]}
                    </Avatar>
                  </Badge>
                  <Typography variant="subtitle1" fontWeight={700}>{strukturData[0].nama}</Typography>
                  <Chip label={strukturData[0].jabatan} size="small" color="primary" sx={{ mt: 1, fontFamily: "'Source Sans 3', sans-serif" }} />
                </CardContent>
              </Card>
            </Box>

            {/* Garis */}
            <Box display="flex" justifyContent="center" mb={1}>
              <Box sx={{ width: 2, height: 32, bgcolor: "primary.light" }} />
            </Box>
            <Box display="flex" justifyContent="center" mb={3}>
              <Box sx={{ width: "70%", height: 2, bgcolor: "primary.light" }} />
            </Box>

            {/* Eselon II */}
            <Grid container spacing={2.5} justifyContent="center">
              {strukturData.slice(1).map((s, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Slide in direction="up" timeout={300 + i * 80}>
                    <Card>
                      <CardContent sx={{ p: 2.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ bgcolor: "secondary.light", width: 40, height: 40, fontSize: 16 }}>
                            {s.nama[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                              {s.jabatan}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {s.nama}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Container>

        {/* ── FOOTER ── */}
        <Box sx={{ bgcolor: "#0D3349", color: "rgba(255,255,255,0.7)", py: 4, mt: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} color="#fff" mb={1}>
                  {profilData.singkatan}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.8 }}>
                  {profilData.alamat}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.75}>
                  {[
                    { label: profilData.telepon, icon: Phone },
                    { label: profilData.email, icon: Email },
                    { label: profilData.website, icon: Public },
                  ].map(({ label, icon: Ic }) => (
                    <Stack key={label} direction="row" spacing={1} alignItems="center">
                      <Ic fontSize="small" />
                      <Typography variant="body2" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>{label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
            <Typography variant="caption" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              © {new Date().getFullYear()} Disnakertrans Jawa Tengah — Hak Cipta Dilindungi Undang-Undang.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}