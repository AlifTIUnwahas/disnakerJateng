const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const PORT = 5000;

connectDB();
app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use(express.json()); 
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.get('/api/data', (req, res) => {
    res.json({ message: "Halo, ini data dari backend Node.js!" });
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});