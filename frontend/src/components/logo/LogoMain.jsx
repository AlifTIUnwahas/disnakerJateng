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
        src="/img/ppid.png" 
        alt="Logo PPID" 
        style={{ 
          height: '50px',
          width: 'auto',
          display: 'block'
        }} 
      />

      <Typography
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
      </Typography>
    </Box>
  );
}
