import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ width: '100%', m: 0 }}>
      
      {/* Baris 1: Judul Dashboard */}
      <Grid item xs={12} sx={{ mb: -1, pl: '0px !important' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
          Statistik Pengunjung Website
        </Typography>
      </Grid>

      {/* Baris 2: Tempat Menampilkan Grafik PostHog */}
      <Grid item xs={12} sx={{ pl: '0px !important', pr: '0px !important', width: '100%' }}>
        <Box 
          sx={{ 
            width: '100%', 
            minHeight: '650px', 
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
            bgcolor: '#ffffff'
          }}
        >
          <iframe
            src="https://us.posthog.com/shared/oWNdF5-fNr_Okg6rEUGwmzLI6mKEig"
            width="100%"
            height="650px"
            style={{ 
              border: 'none', 
              display: 'block',
              width: '100%',
              minWidth: '100%',
              backgroundColor: '#ffffff' 
            }}
            title="PostHog Web Analytics"
            allowFullScreen
          />
        </Box>
      </Grid>
    </Grid>
  );
}