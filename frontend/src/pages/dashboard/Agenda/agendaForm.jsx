import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CloseOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const INITIAL_FORM = {
  namaAgenda:       "",
  pimpinanRapat:    "",
  oleh:             "Sekretariat",
  waktuPelaksanaan: "",
  tempat:           "",
  keterangan:       "",
  status:           "Mendatang", 
};

const toDatetimeLocal = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d)) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// ─────────────────────────────────────────────────────────────────────────────
const AgendaForm = ({ open, onClose, onSubmit, initialData = null, loading = false, errorMsg = null }) => {
  const isEdit = Boolean(initialData);
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          namaAgenda:       initialData.namaAgenda       || "",
          pimpinanRapat:    initialData.pimpinanRapat    || "",
          oleh:             initialData.oleh             || "Sekretariat",
          waktuPelaksanaan: toDatetimeLocal(initialData.waktuPelaksanaan),
          tempat:           initialData.tempat           || "",
          keterangan:       initialData.keterangan       || "",
          status:           initialData.status           || "Mendatang",
        });
        setFotoPreview(
          initialData.foto ? `http://localhost:5000${initialData.foto}` : ""
        );
      } else {
        setForm(INITIAL_FORM);
        setFotoPreview("");
      }
      setFotoFile(null);
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    const e = {};
    if (!form.namaAgenda.trim())       e.namaAgenda       = "Nama agenda wajib diisi.";
    if (!form.pimpinanRapat.trim())    e.pimpinanRapat    = "Pimpinan rapat wajib diisi.";
    if (!form.oleh.trim())             e.oleh             = "Penyelenggara wajib diisi.";
    if (!form.waktuPelaksanaan)        e.waktuPelaksanaan = "Waktu pelaksanaan wajib diisi.";
    if (!form.tempat.trim())           e.tempat           = "Tempat wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleRemoveFoto = () => {
    setFotoFile(null);
    setFotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (fotoFile) fd.append("foto", fotoFile);

    onSubmit(fd);
  };

  const sx = { fontFamily: "'Source Sans 3', sans-serif" };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", ...sx } }}
    >
      {/* ── Title ── */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, borderBottom: "1px solid #e2e8f0" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a365d", ...sx }}>
          {isEdit ? "Edit Agenda" : "Tambah Agenda"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseOutlined style={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      {/* ── Content ── */}
      <DialogContent sx={{ pt: 3 }}>
        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

        <Grid container spacing={2}>

          {/* Nama Agenda */}
          <Grid item xs={12}>
            <TextField
              label="Nama Agenda"
              name="namaAgenda"
              value={form.namaAgenda}
              onChange={handleChange}
              error={Boolean(errors.namaAgenda)}
              helperText={errors.namaAgenda}
              fullWidth size="small"
              placeholder="Contoh: Rapat Koordinasi Bulanan"
              InputProps={{ style: sx }}
              InputLabelProps={{ style: sx }}
            />
          </Grid>

          {/* Pimpinan Rapat */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pimpinan Rapat"
              name="pimpinanRapat"
              value={form.pimpinanRapat}
              onChange={handleChange}
              error={Boolean(errors.pimpinanRapat)}
              helperText={errors.pimpinanRapat}
              fullWidth size="small"
              placeholder="Contoh: Bapak Drs. Ahmad"
              InputProps={{ style: sx }}
              InputLabelProps={{ style: sx }}
            />
          </Grid>

          {/* Oleh (Penyelenggara) */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Oleh (Penyelenggara)"
              name="oleh"
              value={form.oleh}
              onChange={handleChange}
              error={Boolean(errors.oleh)}
              helperText={errors.oleh}
              fullWidth size="small"
              placeholder="Contoh: Sekretariat"
              InputProps={{ style: sx }}
              InputLabelProps={{ style: sx }}
            />
          </Grid>

          {/* Waktu Pelaksanaan */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Waktu Pelaksanaan"
              name="waktuPelaksanaan"
              type="datetime-local"
              value={form.waktuPelaksanaan}
              onChange={handleChange}
              error={Boolean(errors.waktuPelaksanaan)}
              helperText={errors.waktuPelaksanaan}
              fullWidth size="small"
              InputLabelProps={{ shrink: true, style: sx }}
              InputProps={{ style: sx }}
            />
          </Grid>

          {/* Tempat */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tempat"
              name="tempat"
              value={form.tempat}
              onChange={handleChange}
              error={Boolean(errors.tempat)}
              helperText={errors.tempat}
              fullWidth size="small"
              placeholder="Contoh: Aula Utama Lt. 2"
              InputProps={{ style: sx }}
              InputLabelProps={{ style: sx }}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={sx}>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange} sx={sx}>
                <MenuItem value="Mendatang" sx={sx}>Mendatang</MenuItem>
                <MenuItem value="Selesai"   sx={sx}>Selesai</MenuItem>
                <MenuItem value="Batal"     sx={sx}>Batal</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Keterangan */}
          <Grid item xs={12}>
            <TextField
              label="Keterangan (opsional)"
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              fullWidth size="small" multiline rows={3}
              placeholder="Tambahkan catatan atau deskripsi agenda..."
              InputProps={{ style: sx }}
              InputLabelProps={{ style: sx }}
            />
          </Grid>

          {/* Upload Foto */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1, color: "#475569", fontWeight: 600, ...sx }}>
              Foto Agenda (opsional, maks. 3 MB)
            </Typography>

            {/* Preview */}
            {fotoPreview && (
              <Box sx={{ position: "relative", display: "inline-block", mb: 1.5 }}>
                <Box
                  component="img"
                  src={fotoPreview}
                  alt="preview"
                  sx={{ width: 160, height: 100, objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <IconButton
                  size="small"
                  onClick={handleRemoveFoto}
                  sx={{
                    position: "absolute", top: -8, right: -8,
                    bgcolor: "#ef4444", color: "#fff",
                    width: 22, height: 22,
                    "&:hover": { bgcolor: "#dc2626" }
                  }}
                >
                  <DeleteOutlined style={{ fontSize: 12 }} />
                </IconButton>
              </Box>
            )}

            <Box>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={fileInputRef}
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  borderColor: "#cbd5e1", color: "#475569",
                  textTransform: "none", borderRadius: "8px", ...sx,
                }}
              >
                {fotoPreview ? "Ganti Foto" : "Pilih Foto"}
              </Button>
              {fotoFile && (
                <Typography variant="caption" sx={{ ml: 1.5, color: "#64748b", ...sx }}>
                  {fotoFile.name}
                </Typography>
              )}
              <FormHelperText sx={sx}>
                {isEdit && !fotoFile ? "Biarkan kosong jika tidak ingin mengganti foto." : ""}
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* ── Actions ── */}
      <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #e2e8f0", gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ borderColor: "#cbd5e1", color: "#475569", textTransform: "none", borderRadius: "8px", ...sx }}
        >
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ bgcolor: "#2B689C", textTransform: "none", borderRadius: "8px", "&:hover": { bgcolor: "#1a4f7a" }, ...sx }}
        >
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Agenda"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgendaForm;