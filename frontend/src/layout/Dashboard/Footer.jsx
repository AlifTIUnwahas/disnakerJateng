// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; All rights reserved{' '}
        <Link href="https://disnakertrans.jatengprov.go.id" target="_blank" underline="hover">
          Disnakertrans Jateng
        </Link>
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="https://codedthemes.com/hire-us/" target="_blank" variant="caption" color="text.primary">
          Template
        </Link>
        <Link href="https://mui.com/store/license/" target="_blank" variant="caption" color="text.primary">
          License
        </Link>
        <Link href="https://mui.com/store/terms/" target="_blank" variant="caption" color="text.primary">
          Terms
        </Link>
        <Typography variant="subtitle2" >
          Dev by Team{' '}
        <Link href="https://id.linkedin.com/in/alif-azizy" target="_blank" variant="caption" color="text.primary">
          Teknik Informatika Unwahas
        </Link>
        </Typography>
      </Stack>
    </Stack>
  );
}
