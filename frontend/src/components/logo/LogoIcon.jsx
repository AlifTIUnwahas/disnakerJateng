// material-ui
import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <img 
        src="/img/jateng.png" 
        alt="Logo PPID" 
        style={{ 
          height: '50px',
          width: 'auto',
          display: 'block'
        }} 
      />
  );
}
