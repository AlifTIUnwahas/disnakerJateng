import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthForgot from 'sections/auth/AuthForgot';

// ================================|| JWT - Forgot ||================================ //

export default function Forgot() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
            <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Remember your password?
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <AuthForgot />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
