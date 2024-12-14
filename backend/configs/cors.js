const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Izinkan frontend untuk mengakses
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
