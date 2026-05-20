import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import BursaForm from "./bursaForm";
import {
  getAllBursaKerja,
  createBursaKerja,
  updateBursaKerja,
  deleteBursaKerja,
} from "./bursaService";

// ─────────────────────────────────────────────────────────────────────────────
// Helper deadline — sama persis dengan tampilan publik
// ─────────────────────────────────────────────────────────────────────────────
const formatDeadline = (dateStr) => {
  if (!dateStr) return { label: "-", color: "default" };
  const deadlineDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  const daysDiff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const formattedDate = deadlineDate.toLocaleDateString("id-ID", {
    year: "numeric", month: "2-digit", day: "2-digit",
  });
  if (daysDiff < 0)  return { label: "Selesai",           color: "error" };
  if (daysDiff === 0) return { label: "Hari Ini Terakhir!", color: "error" };
  if (daysDiff <= 3)  return { label: `Sisa ${daysDiff} Hari!`, color: "warning" };
  return { label: formattedDate, color: "secondary" };
};

// ─────────────────────────────────────────────────────────────────────────────
// Kolom tabel — tambah kolom Status sesuai schema
// ─────────────────────────────────────────────────────────────────────────────
const COLUMNS = [
  { id: "no",         label: "No",           width: 50,  align: "center" },
  { id: "posisi",     label: "Posisi",        minWidth: 150 },
  { id: "perusahaan", label: "Perusahaan",    minWidth: 150 },
  { id: "lokasi",     label: "Lokasi",        minWidth: 110 },
  { id: "deadline",   label: "Batas Lamaran", minWidth: 130, align: "center" },
  { id: "status",     label: "Status",        width: 100,  align: "center" },
  { id: "aksi",       label: "Aksi",          width: 100,  align: "center" },
];

const SX_HEADER = {
  fontWeight: 700,
  color: "#ffffff",
  bgcolor: "#2B689C",
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const SX_CELL = {
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "13px",
  color: "#334155",
};

// ─────────────────────────────────────────────────────────────────────────────
export const DashboardBursa = () => {
  // ── State data ──────────────────────────────────────────────────────────
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // ── State tabel ─────────────────────────────────────────────────────────
  const [search]             = useState("");
  const [page, setPage]                 = useState(0);
  const [rowsPerPage, setRowsPerPage]   = useState(10);

  // ── State form ───────────────────────────────────────────────────────────
  const [formOpen, setFormOpen]         = useState(false);
  const [formTarget, setFormTarget]     = useState(null);   // null = tambah
  const [formLoading, setFormLoading]   = useState(false);
  const [formError, setFormError]       = useState(null);

  // ── State hapus ──────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget]   = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Snackbar ─────────────────────────────────────────────────────────────
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const showSnack = (message, severity = "success") =>
    setSnack({ open: true, message, severity });

  // ── Fetch ─────────────────────────────────────────────────────────────────
  // getAllBursaKerja → array langsung (bukan { success, data })
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await getAllBursaKerja();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setFetchError("Gagal memuat data. Periksa koneksi ke server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Filter & paginasi ────────────────────────────────────────────────────
  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.posisi?.toLowerCase().includes(q) ||
      r.perusahaan?.toLowerCase().includes(q) ||
      r.lokasi?.toLowerCase().includes(q)
    );
  });
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // ── CRUD handlers ─────────────────────────────────────────────────────────

  const handleOpenTambah = () => {
    setFormTarget(null);
    setFormError(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (row) => {
    setFormTarget(row);
    setFormError(null);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    setFormError(null);
    try {
      if (formTarget) {
        const id = formTarget._id || formTarget.id;
        await updateBursaKerja(id, formData);
        showSnack("Lowongan berhasil diperbarui.");
      } else {
        await createBursaKerja(formData);
        showSnack("Lowongan berhasil ditambahkan.");
      }
      setFormOpen(false);
      await fetchData();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Gagal menyimpan data. Periksa kembali isian form.";
      setFormError(msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDelete  = (row) => setDeleteTarget(row);
  const handleCloseDelete = ()    => setDeleteTarget(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const id = deleteTarget._id || deleteTarget.id;
      await deleteBursaKerja(id);
      showSnack("Lowongan berhasil dihapus.");
      setDeleteTarget(null);
      await fetchData();
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menghapus data. Coba lagi.";
      showSnack(msg, "error");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <Box sx={{ py: 3, fontFamily: "'Source Sans 3', sans-serif" }}>
      <Container maxWidth={false}>

        {/* ── Header ── */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a365d", fontFamily: "'Source Sans 3', sans-serif" }}>
              Dashboard Manajemen Bursa Kerja
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refresh data">
              <IconButton
                onClick={fetchData}
                disabled={loading}
                sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}
              >
                <ReloadOutlined spin={loading} />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleOpenTambah}
              sx={{
                bgcolor: "#006eff",
                fontFamily: "'Source Sans 3', sans-serif",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#1a4f7a" },
              }}
            >
              Tambah Lowongan
            </Button>
          </Box>
        </Box>

        {/* ── Error fetch ── */}
        {fetchError && <Alert severity="error" sx={{ mb: 2 }}>{fetchError}</Alert>}

        {/* ── Tabel ── */}
        <Paper elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || "left"}
                      sx={{ ...SX_HEADER, width: col.width, minWidth: col.minWidth }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={32} sx={{ color: "#2B689C" }} />
                      <Typography sx={{ mt: 1, color: "text.secondary", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                        Memuat data...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6 }}>
                      <Typography sx={{ color: "text.secondary", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
                        {search ? "Tidak ada hasil yang cocok." : "Belum ada data lowongan."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((row, idx) => {
                    const deadline = formatDeadline(row.deadline);
                    return (
                      <TableRow key={row._id || row.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>

                        {/* No */}
                        <TableCell align="center" sx={SX_CELL}>
                          {page * rowsPerPage + idx + 1}
                        </TableCell>

                        {/* Posisi */}
                        <TableCell sx={SX_CELL}>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", textTransform: "capitalize" }}>
                            {row.posisi?.toLowerCase()}
                          </Typography>
                        </TableCell>

                        {/* Perusahaan */}
                        <TableCell sx={SX_CELL}>{row.perusahaan}</TableCell>

                        {/* Lokasi */}
                        <TableCell sx={SX_CELL}>{row.lokasi}</TableCell>

                        {/* Deadline */}
                        <TableCell align="center" sx={SX_CELL}>
                          <Chip
                            label={deadline.label}
                            color={deadline.color}
                            size="small"
                            variant={deadline.color === "secondary" ? "outlined" : "filled"}
                            sx={{ fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", height: 22 }}
                          />
                        </TableCell>

                        {/* Status — enum 'Aktif' | 'Nonaktif' dari schema */}
                        <TableCell align="center" sx={SX_CELL}>
                          <Chip
                            label={row.status || "Aktif"}
                            size="small"
                            sx={{
                              fontSize: 12,
                              fontFamily: "'Source Sans 3', sans-serif",
                              height: 22,
                              bgcolor: row.status === "Nonaktif" ? "#f1f5f9" : "#dcfce7",
                              color:  row.status === "Nonaktif" ? "#64748b"  : "#16a34a",
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>

                        {/* Aksi */}
                        <TableCell align="center" sx={SX_CELL}>
                          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenEdit(row)}
                                sx={{ color: "#2B689C", "&:hover": { bgcolor: "#e8f0fe" } }}
                              >
                                <EditOutlined style={{ fontSize: 15 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Hapus">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDelete(row)}
                                sx={{ color: "#ef4444", "&:hover": { bgcolor: "#fee2e2" } }}
                              >
                                <DeleteOutlined style={{ fontSize: 15 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Paginasi ── */}
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Baris:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count}`}
            sx={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}
          />
        </Paper>
      </Container>

      {/* ── Form Modal (Tambah / Edit) ── */}
      <BursaForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={formTarget}
        loading={formLoading}
        errorMsg={formError}
      />

      {/* ── Dialog Konfirmasi Hapus ── */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={handleCloseDelete}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#1a365d", fontFamily: "'Source Sans 3', sans-serif" }}>
          Hapus Lowongan
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Yakin ingin menghapus lowongan{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {deleteTarget?.posisi?.toLowerCase()}
            </strong>{" "}
            di <strong>{deleteTarget?.perusahaan}</strong>?{" "}
            Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDelete}
            variant="outlined"
            disabled={deleteLoading}
            sx={{ borderColor: "#cbd5e1", color: "#475569", textTransform: "none", fontFamily: "'Source Sans 3', sans-serif", borderRadius: "8px" }}
          >
            Batal
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={14} color="inherit" /> : <DeleteOutlined />}
            sx={{ textTransform: "none", fontFamily: "'Source Sans 3', sans-serif", borderRadius: "8px" }}
          >
            {deleteLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};