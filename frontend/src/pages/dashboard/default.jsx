import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Baris 1: Judul Dashboard */}
      <Grid item sx={{ mb: -2.25 }} xs={12}>
        <Typography variant="h3">Statistik Pengunjung Website</Typography>
      </Grid>

      {/* Baris 2: Tempat Menampilkan Grafik PostHog */}
      <Grid item xs={12}>
        <MainCard content={false} sx={{ p: 2, minHeight: '650px' }}>
          <iframe
            src="https://us.posthog.com/project/428780/web"
            width="100%"
            height="600px"
            style={{ 
              border: 'none', 
              borderRadius: '8px',
              backgroundColor: 'transparent' 
            }}
            title="PostHog Web Analytics"
            allowFullScreen
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}