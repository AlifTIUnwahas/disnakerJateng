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
        src="/img/jateng.png" 
        alt="Logo PPID" 
        style={{ 
          height: '50px',
          width: 'auto',
          display: 'block'
        }} 
      />

      <Typography
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
      </Typography>
    </Box>
  );
}
