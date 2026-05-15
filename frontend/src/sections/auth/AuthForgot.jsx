import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthForgot() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    return (
        <Formik
  initialValues={{
    email: '',
    submit: null
  }}
  validationSchema={Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required')
  })}
  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ success: true });
        alert('Instruksi reset password telah dikirim ke email Anda.');
      } else {
        setStatus({ success: false });
        setErrors({ submit: data.message || 'Gagal mengirim email reset' });
      }
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: 'Server connection failed' });
    } finally {
      setSubmitting(false);
    }
  }}
>
  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
  <form noValidate onSubmit={handleSubmit}>
  <Grid container spacing={3} direction="column">
    {/* Field Email */}
    <Grid item xs={12}>
      <Stack spacing={1}>
        <InputLabel htmlFor="email-forgot">Email Address*</InputLabel>
        <OutlinedInput
          fullWidth
          error={Boolean(touched.email && errors.email)}
          id="email-forgot"
          type="email"
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Masukkan email terdaftar"
        />
      </Stack>
      {touched.email && errors.email && (
        <FormHelperText error id="helper-email-forgot">
          {errors.email}
        </FormHelperText>
      )}
    </Grid>

    {errors.submit && (
      <Grid item xs={12}>
        <FormHelperText error>{errors.submit}</FormHelperText>
      </Grid>
    )}

    {values.successMessage && (
      <Grid item xs={12}>
        <FormHelperText sx={{ color: 'green' }}>{values.successMessage}</FormHelperText>
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
            Send Reset Link
            </Button>
        </AnimateButton>
        </Grid>
    </Grid>
    </form>
  )}
    </Formik>
    );
}  