const multer = require("multer");
const path = require("path");

// Menentukan tempat penyimpanan dan nama file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Menyimpan di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Memberikan nama file unik berdasarkan waktu
  },
});

// Filter hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);  // Terima file gambar
  } else {
    cb(new Error("Only image files are allowed"), false);  // Tolak selain file gambar
  }
};

// Membuat middleware upload menggunakan multer
const upload = multer({ storage, fileFilter });

// Mengekspor upload untuk digunakan di routes
module.exports = { upload };
