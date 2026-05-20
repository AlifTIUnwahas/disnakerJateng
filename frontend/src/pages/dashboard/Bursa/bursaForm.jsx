import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";

const INITIAL_FORM = {
  posisi: "",
  perusahaan: "",
  lokasi: "",
  deadline: "",
  status: "Aktif",
};

const toInputDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
};

// ─────────────────────────────────────────────────────────────────────────────
// Props:
//   open        – boolean
//   onClose     – () => void
//   onSubmit    – async (formData) => void
//   initialData – object | null  (null = tambah, object = edit)
//   loading     – boolean
//   errorMsg    – string | null
// ─────────────────────────────────────────────────────────────────────────────
const BursaForm = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
  errorMsg = null,
}) => {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          posisi: initialData.posisi || "",
          perusahaan: initialData.perusahaan || "",
          lokasi: initialData.lokasi || "",
          deadline: toInputDate(initialData.deadline),
          status: initialData.status || "Aktif",
        });
      } else {
        setForm(INITIAL_FORM);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    const e = {};
    if (!form.posisi.trim())     e.posisi     = "Posisi wajib diisi.";
    if (!form.perusahaan.trim()) e.perusahaan = "Nama perusahaan wajib diisi.";
    if (!form.lokasi.trim())     e.lokasi     = "Lokasi wajib diisi.";
    if (!form.deadline)          e.deadline   = "Batas lamaran wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", fontFamily: "'Source Sans 3', sans-serif" } }}
    >
      {/* ── Title ── */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#1a365d", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {isEdit ? "Edit Lowongan" : "Tambah Lowongan"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseOutlined style={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      {/* ── Content ── */}
      <DialogContent sx={{ pt: 3 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Grid container spacing={2}>
          {/* Posisi */}
          <Grid item xs={12}>
            <TextField
              label="Posisi / Jabatan"
              name="posisi"
              value={form.posisi}
              onChange={handleChange}
              error={Boolean(errors.posisi)}
              helperText={errors.posisi}
              fullWidth
              size="small"
              placeholder="Contoh: Staff Administrasi"
              InputProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
            />
          </Grid>

          {/* Perusahaan */}
          <Grid item xs={12}>
            <TextField
              label="Nama Perusahaan"
              name="perusahaan"
              value={form.perusahaan}
              onChange={handleChange}
              error={Boolean(errors.perusahaan)}
              helperText={errors.perusahaan}
              fullWidth
              size="small"
              placeholder="Contoh: PT Maju Bersama"
              InputProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
            />
          </Grid>

          {/* Lokasi */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lokasi"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              error={Boolean(errors.lokasi)}
              helperText={errors.lokasi}
              fullWidth
              size="small"
              placeholder="Contoh: Brebes"
              InputProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
            />
          </Grid>

          {/* Deadline */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Batas Lamaran"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              error={Boolean(errors.deadline)}
              helperText={errors.deadline}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true, style: { fontFamily: "'Source Sans 3', sans-serif" } }}
              InputProps={{ style: { fontFamily: "'Source Sans 3', sans-serif" } }}
            />
          </Grid>

          {/* Status — enum: 'Aktif' | 'Nonaktif' sesuai schema */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>Status</InputLabel>
              <Select
                name="status"
                value={form.status}
                label="Status"
                onChange={handleChange}
                sx={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <MenuItem value="Aktif"   sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>Aktif</MenuItem>
                <MenuItem value="Nonaktif" sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>Nonaktif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      {/* ── Actions ── */}
      <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e2e8f0", gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            borderColor: "#cbd5e1",
            color: "#475569",
            fontFamily: "'Source Sans 3', sans-serif",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{
            bgcolor: "#2B689C",
            fontFamily: "'Source Sans 3', sans-serif",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { bgcolor: "#1a4f7a" },
          }}
        >
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Lowongan"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BursaForm;