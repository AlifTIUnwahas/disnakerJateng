require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const bursaKerjaRoutes = require('./routes/bursaKerja');
const agendaRoutes = require('./routes/agenda');
const infoRoutes = require('./routes/info');
const keberatanRoutes = require('./routes/keberatan');
const permohonanRoutes = require('./routes/permohonan');
const PORT = 5000;

connectDB();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://colorfully-formfitting-lacey.ngrok-free.dev'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bursa-kerja', bursaKerjaRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/berita', require('./routes/publicBerita'));
app.use('/api/informasi', infoRoutes);
app.use('/api/keberatan', keberatanRoutes);
app.use('/api/permohonan', permohonanRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.get('/api/data', (req, res) => {
    res.json({ message: "Halo, ini data dari backend Node.js!" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
