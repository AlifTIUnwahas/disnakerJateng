// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// ==============================|| LOGO SVG ||============================== //

export default function LogoMain() {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {/* Logo Gambar */}
      <img 
<<<<<<< HEAD
        src="/img/jateng.png" 
=======
        src="/img/ppid.png" 
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
        alt="Logo PPID" 
        style={{ 
          height: '50px',
          width: 'auto',
          display: 'block'
        }} 
      />

      <Typography
<<<<<<< HEAD
        variant="h6"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          lineHeight: 1.2,
          fontFamily: "'Public Sans', sans-serif",
          letterSpacing: '0.02em',
          ml: 1.5,
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
      >
        Disnakertrans Jateng
=======
        variant="h3"
        sx={{
          fontWeight: 800,
          color: theme.vars.palette.common.black,
          opacity: 0.85,
          lineHeight: 1,
          fontFamily: 'Public Sans, sans-serif'
        }}
      >
        PPID Disnakertrans Jateng
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
      </Typography>
    </Box>
  );
}
