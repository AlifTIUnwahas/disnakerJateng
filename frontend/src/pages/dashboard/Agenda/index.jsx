import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
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
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import AgendaForm from "./agendaForm";
import { getAllAgenda, createAgenda, updateAgenda, deleteAgenda } from "./agendaService";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const BASE_IMG = "http://localhost:5000";

const formatWaktu = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

// Chip warna sesuai status enum: 'Mendatang' | 'Selesai' | 'Batal'
const STATUS_STYLE = {
  Mendatang: { bgcolor: "#dbeafe", color: "#1d4ed8" },
  Selesai:   { bgcolor: "#dcfce7", color: "#16a34a" },
  Batal:     { bgcolor: "#fee2e2", color: "#dc2626" },
};

// ─────────────────────────────────────────────────────────────────────────────
const COLUMNS = [
  { id: "no",      label: "No",             width: 50,  align: "center" },
  { id: "foto",    label: "Foto",           width: 'auto',  align: "center" },
  { id: "agenda",  label: "Agenda",         minWidth: 200 },
  { id: "waktu",   label: "Waktu",          minWidth: 150 },
  { id: "tempat",  label: "Tempat",         minWidth: 120 },
  { id: "status",  label: "Status",         width: 110, align: "center" },
  { id: "aksi",    label: "Aksi",           width: 100, align: "center" },
];

const SX_HEADER = {
  fontWeight: 700, color: "#ffffff", bgcolor: "#2B689C",
  fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", whiteSpace: "nowrap",
};
const SX_CELL = {
  fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#334155",
};

// ─────────────────────────────────────────────────────────────────────────────
export const DashboardAgenda = () => {
  // ── State data ─────────────────────────────────────────────────────────
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // ── State tabel ────────────────────────────────────────────────────────
  const [search]           = useState("");
  const [page, setPage]               = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── State form ─────────────────────────────────────────────────────────
  const [formOpen, setFormOpen]       = useState(false);
  const [formTarget, setFormTarget]   = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]     = useState(null);

  // ── State hapus ────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget]   = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Snackbar ───────────────────────────────────────────────────────────
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const showSnack = (message, severity = "success") =>
    setSnack({ open: true, message, severity });

  // ── Fetch — response: { success, count, data: [...] } ─────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await getAllAgenda();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setFetchError("Gagal memuat data. Periksa koneksi ke server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Filter & paginasi ──────────────────────────────────────────────────
  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.namaAgenda?.toLowerCase().includes(q) ||
      r.pimpinanRapat?.toLowerCase().includes(q) ||
      r.tempat?.toLowerCase().includes(q) ||
      r.oleh?.toLowerCase().includes(q)
    );
  });
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // ── CRUD handlers ──────────────────────────────────────────────────────
  const handleOpenTambah = () => { setFormTarget(null); setFormError(null); setFormOpen(true); };
  const handleOpenEdit   = (row) => { setFormTarget(row); setFormError(null); setFormOpen(true); };

  // onSubmit menerima FormData (dari agendaForm) karena ada upload foto
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    setFormError(null);
    try {
      if (formTarget) {
        const id = formTarget._id || formTarget.id;
        await updateAgenda(id, formData);
        showSnack("Agenda berhasil diperbarui.");
      } else {
        await createAgenda(formData);
        showSnack("Agenda berhasil ditambahkan.");
      }
      setFormOpen(false);
      await fetchData();
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menyimpan data. Coba lagi.";
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
      await deleteAgenda(id);
      showSnack("Agenda berhasil dihapus.");
      setDeleteTarget(null);
      await fetchData();
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menghapus data.";
      showSnack(msg, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ py: 3, fontFamily: "'Source Sans 3', sans-serif" }}>
      <Container maxWidth={false}>

        {/* ── Header ── */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a365d", fontFamily: "'Source Sans 3', sans-serif" }}>
              Manajemen Agenda
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refresh data">
              <IconButton onClick={fetchData} disabled={loading} sx={{ border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                <ReloadOutlined spin={loading} />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleOpenTambah}
              sx={{ bgcolor: "#006eff", fontFamily: "'Source Sans 3', sans-serif", textTransform: "none", borderRadius: "8px", "&:hover": { bgcolor: "#1a4f7a" } }}
            >
              Tambah Agenda
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
                        {search ? "Tidak ada hasil yang cocok." : "Belum ada data agenda."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((row, idx) => {
                    const statusSx = STATUS_STYLE[row.status] || STATUS_STYLE.Mendatang;
                    return (
                      <TableRow key={row._id || row.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>

                        {/* No */}
                        <TableCell align="center" sx={SX_CELL}>
                          {page * rowsPerPage + idx + 1}
                        </TableCell>

                        {/* Foto */}
                        <TableCell align="center" sx={SX_CELL}>
                          {row.foto ? (
                            <Avatar
                              src={row.foto.startsWith("http") ? row.foto : `${BASE_IMG}${row.foto}`}
                              variant="rounded"
                              sx={{ width: '100%', height: '100%', mx: "auto", borderRadius: "6px" }}
                            />
                          ) : (
                            <Avatar
                              variant="rounded"
                              sx={{ width: 44, height: 36, mx: "auto", borderRadius: "6px", bgcolor: "#f1f5f9", color: "#94a3b8", fontSize: 18 }}
                            >
                              <CalendarOutlined />
                            </Avatar>
                          )}
                        </TableCell>

                        {/* Agenda (nama + pimpinan + oleh) */}
                        <TableCell sx={SX_CELL}>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", mb: 0.3 }}>
                            {row.namaAgenda}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "#64748b", fontFamily: "'Source Sans 3', sans-serif", display: "flex", alignItems: "center", gap: 0.5 }}>
                            <UserOutlined /> {row.pimpinanRapat}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "#64748b", fontFamily: "'Source Sans 3', sans-serif", display: "flex", alignItems: "center", gap: 0.5 }}>
                            <TeamOutlined /> {row.oleh}
                          </Typography>
                        </TableCell>

                        {/* Waktu */}
                        <TableCell sx={SX_CELL}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarOutlined style={{ color: "#94a3b8", fontSize: 13 }} />
                            <span>{formatWaktu(row.waktu)}</span>
                          </Box>
                        </TableCell>

                        {/* Tempat */}
                        <TableCell sx={SX_CELL}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <EnvironmentOutlined style={{ color: "#94a3b8", fontSize: 13 }} />
                            <span>{row.tempat}</span>
                          </Box>
                        </TableCell>

                        {/* Status */}
                        <TableCell align="center" sx={SX_CELL}>
                          <Chip
                            label={row.status || "Mendatang"}
                            size="small"
                            sx={{
                              fontSize: 12, height: 22,
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontWeight: 600,
                              ...statusSx,
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

      {/* ── Form Modal ── */}
      <AgendaForm
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
          Hapus Agenda
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Yakin ingin menghapus agenda <strong>{deleteTarget?.namaAgenda}</strong>?{" "}
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

export default DashboardAgenda;