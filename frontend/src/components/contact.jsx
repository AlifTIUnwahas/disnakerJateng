import React from "react";
import { Box, Container, Grid, Stack, Typography, Divider } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";


export const Contact = (props) => {
  const profilData = {
  nama: "Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah",
  singkatan: "Disnakertrans Jateng",
  tahunBerdiri: 1950,
  alamat: "Jl. Pahlawan No. 16, Semarang, Jawa Tengah, Indonesia",
  telepon: "(024) 8311713 / (024) 8311711",
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
  
  return (
        <Box sx={{ bgcolor: "#41a3db", color: "rgba(255,255,255,0.7)", py: 4, mt: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" fontWeight={700} mb={1} >
                  {profilData.singkatan}
                </Typography>
                <Typography variant="h4"  sx={{ fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.8 }}>
                  {profilData.alamat}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.75}>
                  {[
                    { label: profilData.telepon, icon: Phone },
                    { label: profilData.email, icon: Email },
                  ].map(({ label, icon: Ic }) => (
                    <Stack key={label} direction="row" spacing={1} alignItems="center">
                      <Ic fontSize="small" />
                      <Typography variant="h4" color="white" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>{label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
            <Typography variant="h6" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              © {new Date().getFullYear()} Disnakertrans Jawa Tengah — Hak Cipta Dilindungi Undang-Undang.
            </Typography>
          </Container>
        </Box>
  );
};
