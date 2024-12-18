const cors = require('cors');

app.use(
  cors({
    origin: 'https://digicar.my.id', // Izinkan frontend untuk mengakses
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
