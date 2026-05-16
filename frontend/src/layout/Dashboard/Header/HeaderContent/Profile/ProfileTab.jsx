import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import API from 'api/axiosInstance';

// material-ui
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Divider,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import InstagramOutlined from '@ant-design/icons/InstagramOutlined';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';

export default function ProfileTab() {
  const navigate = useNavigate();

  // FIX 1: Baca userData lewat fungsi helper agar selalu fresh
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  };

  // FIX 2: userId diambil dengan urutan prioritas yang benar
  // Backend Mongoose pakai _id, tapi beberapa JWT decode bisa pakai id atau userId
  const resolveUserId = () => {
    const u = getUserData();
    return u?._id || u?.id || u?.userId || null;
  };

  const [userData] = useState(getUserData);
  const username = userData?.username || 'Guest';
  const role = userData?.role || 'User';

  const [socials, setSocials] = useState({
    linkedin:  { url: '', isEnabled: false, isEditing: false },
    github:    { url: '', isEnabled: false, isEditing: false },
    instagram: { url: '', isEnabled: false, isEditing: false }
  });

  const [openModal, setOpenModal] = useState({
    edit: false, view: false, social: false, logout: false
  });

  // FIX 3: State untuk loading & error feedback ke user
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [savingPlatform, setSavingPlatform] = useState(null); // platform yang sedang disimpan
  const [socialError, setSocialError] = useState('');
  const [socialSuccess, setSocialSuccess] = useState('');

  const handleOpen  = (type) => setOpenModal((prev) => ({ ...prev, [type]: true }));
  const handleClose = (type) => {
    setOpenModal((prev) => ({ ...prev, [type]: false }));
    // Reset pesan saat modal ditutup
    setSocialError('');
    setSocialSuccess('');
  };

  // ── Fetch social links saat modal dibuka ─────────────────────────────────
  useEffect(() => {
    if (!openModal.social) return;

    const userId = resolveUserId();

    // FIX 4: Guard yang jelas sebelum hit API — cek userId dulu
    if (!userId) {
      setSocialError(
        'ID User tidak ditemukan. Coba logout dan login ulang.'
      );
      return;
    }

    const fetchUserSocials = async () => {
      setLoadingSocial(true);
      setSocialError('');
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const links = response.data?.data?.socialLinks || {};
        setSocials({
          linkedin:  { url: links.linkedin?.url  || '', isEnabled: links.linkedin?.isEnabled  || false, isEditing: false },
          github:    { url: links.github?.url    || '', isEnabled: links.github?.isEnabled    || false, isEditing: false },
          instagram: { url: links.instagram?.url || '', isEnabled: links.instagram?.isEnabled || false, isEditing: false }
        });
      } catch (error) {
        console.error('Gagal memuat data media sosial:', error);
        setSocialError('Gagal memuat data sosial. Silakan coba lagi.');
      } finally {
        setLoadingSocial(false);
      }
    };

    fetchUserSocials();
  }, [openModal.social]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Toggle edit mode per platform ────────────────────────────────────────
  const handleEditClick = (platform) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], isEditing: !prev[platform]?.isEditing }
    }));
    setSocialError('');
    setSocialSuccess('');
  };

  const handleUrlChange = (platform, value) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], url: value }
    }));
  };

  // ── Save social link ──────────────────────────────────────────────────────
  const handleSaveUrl = async (platform) => {
    const userId = resolveUserId();

    // FIX 5: Validasi userId sebelum kirim request — tampilkan error ke UI
    if (!userId) {
      setSocialError('ID User tidak ditemukan. Coba logout dan login ulang.');
      return;
    }

    setSavingPlatform(platform);
    setSocialError('');
    setSocialSuccess('');

    try {
      const token = localStorage.getItem('token');

      // FIX 6: Payload eksplisit — pastikan userId selalu terkirim
      const payload = {
        userId,
        linkedin:  socials.linkedin.url,
        github:    socials.github.url,
        instagram: socials.instagram.url
      };

      const response = await API.put('/admin/user/update-socials', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.success) {
        setSocials((prev) => ({
          ...prev,
          [platform]: {
            ...prev[platform],
            isEnabled: !!prev[platform].url,
            isEditing: false
          }
        }));
        setSocialSuccess(`${platform.charAt(0).toUpperCase() + platform.slice(1)} berhasil disimpan!`);
      } else {
        setSocialError(response.data?.message || 'Gagal menyimpan. Coba lagi.');
      }
    } catch (error) {
      console.error(`Gagal menyimpan data ${platform}:`, error);
      // FIX 7: Tampilkan pesan error dari server jika ada
      const serverMsg = error?.response?.data?.message;
      setSocialError(serverMsg || `Gagal menyimpan ${platform}. Periksa koneksi dan coba lagi.`);
    } finally {
      setSavingPlatform(null);
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogoutAction = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleClose('logout');
    navigate('/login', { replace: true });
  };

  // ── Helper render satu baris social ──────────────────────────────────────
  const SocialRow = ({ platform, icon, label, placeholder }) => (
    <Box sx={{ mb: 2 }}>
      <ListItemButton sx={{ px: 1 }}>
        <ListItemIcon sx={{ fontSize: '1.25rem' }}>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          secondary={socials[platform]?.url || `Belum terhubung`}
          secondaryTypographyProps={{ noWrap: true, style: { maxWidth: 200 } }}
        />
        <Button
          variant="outlined"
          size="small"
          color={socials[platform]?.url ? 'secondary' : 'primary'}
          onClick={() => handleEditClick(platform)}
          disabled={savingPlatform === platform}
        >
          {socials[platform]?.url ? 'Edit' : 'Add'}
        </Button>
      </ListItemButton>

      {socials[platform]?.isEditing && (
        <Box sx={{ px: 1, pb: 1, mt: 1, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            label={`${label} URL`}
            placeholder={placeholder}
            value={socials[platform]?.url || ''}
            onChange={(e) => handleUrlChange(platform, e.target.value)}
            disabled={savingPlatform === platform}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSaveUrl(platform)}
            disabled={savingPlatform === platform}
            startIcon={savingPlatform === platform ? <CircularProgress size={14} color="inherit" /> : null}
          >
            {savingPlatform === platform ? '...' : 'Save'}
          </Button>
        </Box>
      )}
    </Box>
  );

  SocialRow.propTypes = {
    platform: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton onClick={() => handleOpen('edit')}>
          <ListItemIcon><EditOutlined /></ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOpen('view')}>
          <ListItemIcon><UserOutlined /></ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOpen('social')}>
          <ListItemIcon><ProfileOutlined /></ListItemIcon>
          <ListItemText primary="Social Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOpen('logout')}>
          <ListItemIcon><LogoutOutlined /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      {/* ── 1. MODAL VIEW PROFILE ─────────────────────────────────────────── */}
      <Dialog open={openModal.view} onClose={() => handleClose('view')} maxWidth="sm" fullWidth>
        <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="600">User Profile</Typography>
          <IconButton onClick={() => handleClose('view')} size="small"><CloseOutlined /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.lighter', color: 'primary.main', fontSize: '2rem' }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h4">{username}</Typography>
              <Typography variant="body2" color="textSecondary">{role}</Typography>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary">Email Address</Typography>
              <Typography variant="body1" fontWeight="500">{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">Status</Typography>
              <Box sx={{ mt: 0.5 }}>
                <Typography variant="body2" component="span" sx={{ px: 1.5, py: 0.5, bgcolor: 'success.lighter', color: 'success.main', borderRadius: 1, fontWeight: 500 }}>
                  Active
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => handleClose('view')}>Close</Button>
          <Button variant="contained" onClick={() => { handleClose('view'); handleOpen('edit'); }} startIcon={<EditOutlined />}>
            Edit Profile
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── 2. MODAL EDIT PROFILE ─────────────────────────────────────────── */}
      <Dialog open={openModal.edit} onClose={() => handleClose('edit')} maxWidth="sm" fullWidth>
        <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="600">Edit Profile Details</Typography>
          <IconButton onClick={() => handleClose('edit')} size="small"><CloseOutlined /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" defaultValue={username} placeholder="Enter username" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email Address" defaultValue={userData?.email} type="email" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => handleClose('edit')}>Cancel</Button>
          <Button variant="contained" onClick={() => handleClose('edit')}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* ── 3. MODAL SOCIAL PROFILE ───────────────────────────────────────── */}
      <Dialog open={openModal.social} onClose={() => handleClose('social')} maxWidth="xs" fullWidth>
        <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="600">Social Networks</Typography>
          <IconButton onClick={() => handleClose('social')} size="small"><CloseOutlined /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent dividers sx={{ p: 2 }}>

          {/* FIX 8: Tampilkan error/success/loading ke user */}
          {socialError   && <Alert severity="error"   sx={{ mb: 2 }} onClose={() => setSocialError('')}>{socialError}</Alert>}
          {socialSuccess && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSocialSuccess('')}>{socialSuccess}</Alert>}

          {loadingSocial ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <List disablePadding>
                <SocialRow
                  platform="linkedin"
                  icon={<LinkedinOutlined style={{ color: '#1890ff' }} />}
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                  url={socials.linkedin?.url}
                />
                <SocialRow
                  platform="github"
                  icon={<GithubOutlined />}
                  label="GitHub"
                  placeholder="https://github.com/username"
                  url={socials.github?.url}
                />
                <SocialRow
                  platform="instagram"
                  icon={<InstagramOutlined style={{ color: '#e1306c' }} />}
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                  url={socials.instagram?.url}
                />
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" fullWidth onClick={() => handleClose('social')}>Done</Button>
        </DialogActions>
      </Dialog>

      {/* ── 4. MODAL LOGOUT ───────────────────────────────────────────────── */}
      <Dialog open={openModal.logout} onClose={() => handleClose('logout')} maxWidth="xs" fullWidth>
        <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="600">Confirm Logout</Typography>
          <IconButton onClick={() => handleClose('logout')} size="small"><CloseOutlined /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" color="textSecondary">
            Apakah Anda yakin ingin keluar dari akun saat ini? Semua sesi aktif pada perangkat ini akan diakhiri.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => handleClose('logout')}>Cancel</Button>
          <Button variant="contained" color="error" fullWidth onClick={handleLogoutAction}>Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };