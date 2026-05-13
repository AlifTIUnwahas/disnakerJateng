import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
<<<<<<< HEAD
          username: '',
          email: '',
=======
          firstname: '',
          lastname: '',
          email: '',
          company: '',
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
<<<<<<< HEAD
          username: Yup.string()
            .max(255)
            .required('Username is required')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be less than 20 characters')
            .test('no-spaces', 'Password cannot start or end with spaces', (value) => value === value?.trim())
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
              })
            });

            const data = await response.json();

            if (response.ok) {
              setStatus({ success: true });
              setSubmitting(false);
              // Opsional: arahkan ke halaman login
              // navigate('/login');
            } else {
              setStatus({ success: false });
              setErrors({ submit: data.message || 'Registration failed' });
              setSubmitting(false);
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: 'Server connection failed' });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              {/* Field Username */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-signup">Username*</InputLabel>
                  <OutlinedInput
                    id="username-signup"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Contoh: user_keren123"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                  <FormHelperText error id="helper-username-signup">
                    {errors.username}
                  </FormHelperText>
                  )}
                </Stack>
                
              </Grid>

              {/* Field Email */}
              <Grid item xs={12}>
                <Stack spacing={1}>
=======
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
            .max(10, 'Password must be less than 10 characters')
        })}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
<<<<<<< HEAD
                    id="email-signup"
=======
                    id="email-login"
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                </Stack>
                {touched.email && errors.email && (
<<<<<<< HEAD
                  <FormHelperText error id="helper-email-signup">
=======
                  <FormHelperText error id="helper-text-email-signup">
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
<<<<<<< HEAD

              {/* Field Password */}
              <Grid item xs={12}>
                <Stack spacing={1}>
=======
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
<<<<<<< HEAD
                    onChange={handleChange}
=======
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                </Stack>
                {touched.password && errors.password && (
<<<<<<< HEAD
                  <FormHelperText error id="helper-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              {/* Error Message dari API */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
=======
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid size={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid size={12}>
                <AnimateButton>
                  <Button fullWidth size="large" variant="contained" color="primary">
>>>>>>> 5b43cb788d1e8c7c08b3c7160665734c8edc3a60
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
