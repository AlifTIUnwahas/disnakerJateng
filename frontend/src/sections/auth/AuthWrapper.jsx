import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //
const styles = {
     headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    },
  }
export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Stack sx={{ minHeight: '100vh', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ px: 3, mt: 3 }} size={12}>
          <Logo to="/" />
        </Box>
        <Box size={12} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 132px)' } }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
              <div style={styles.headerLogos}>
                <img src="/img/jateng.png" alt="Jateng" style={{ height: "70px" }} />
                <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
                <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
              </div>
            
            </Grid>
          </Grid>
        </Box>
        <AuthFooter />
      </Stack>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
