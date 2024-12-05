require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Car = require("../models/Car");
const Blog = require("../models/Blog");
const Testimoni = require("../models/Testimoni");
const { mongoUri } = require("../configs/env");
const jsonwebtoken = require("jsonwebtoken");

const users = [
  {
    name: "Admin yusa",
    email: "admin@example.com",
    username: "adminyusa",
    password: "admin123",
    role: "admin",
  },
  {
    name: "User yusa",
    email: "user@example.com",
    username: "useryusa",
    password: "user123",
    role: "user",
  },
];

const cars = [
  {
    tahun: "2022",
    name: "Toyota Avanza",
    description: "Mobil dengan spek perguso.",
    pricePerDay: 350000,
    image: "uploads/contoh.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2021",
    name: "Honda Brio",
    description: "Mobil kecil yang cocok untuk bertani.",
    pricePerDay: 250000,
    image: "uploads/contoh.jpg",
    isUsed: "Not Ready",
  },
  {
    tahun: "2020",
    name: "Suzuki Ertiga",
    description: "Mobil dengan kapasitas luas dan tidak mudah terguncang.",
    pricePerDay: 400000,
    image: "uploads/contoh.jpg",
    isUsed: "Ready",
  },
];

const blogs = [
  {
    title: "Tips Perawatan Mobil Selama Musim Hujan",
    category: "Seputar Mobil",
    thumbnail: "uploads/contoh.jpg",
    content:
      "Berikut adalah beberapa tips penting untuk merawat mobil Anda selama musim hujan : 1. pakaikan jas hujan, 2. berteduh di bagasi",
    author: "Admin yusa",
  },
  {
    title: "Destinasi Garuda Wisnu Kencana, Liburan Terbaik di Akhir Tahun",
    category: "Destinasi Populer",
    thumbnail: "uploads/contoh.jpg",
    content:
      "Jika Anda mencari tempat liburan terbaik di akhir tahun, berikut adalah rekomendasi kami yaitu Patung Garuda Wisnu Kencana",
    author: "User yusa",
  },
];

const testimonis = [
  {
    user: "User yusa",
    image: "uploads/contoh.jpg",
    comment: "Pelayanan sangat memuaskan, mobil bersih dan nyaman.",
    rating: 5,
  },
  {
    user: "Admin yusa",
    image: "uploads/contoh.jpg",
    comment: "Proses pemesanan sangat mudah dan cepat",
    rating: 4,
  },
];

const seedDatabase = async () => {
  try {
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");

    await User.deleteMany();
    console.log("Previous user data cleared");
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return {
          ...user,
          password: hashedPassword,
          token: token,
        };
      })
    );

    await User.create(hashedUsers);
    console.log("Users seeded successfully.");

    await Car.deleteMany();
    console.log("Previous car data cleared.");

    await Car.create(cars);
    console.log("Cars seeded successfully.");

    await Blog.deleteMany();
    console.log("Previous blog data cleared.");

    await Blog.create(blogs);
    console.log("Blogs seeded successfully.");

    await Testimoni.deleteMany();
    console.log("Previous testimoni data cleared.");

    await Testimoni.create(testimonis);
    console.log("Testimonis seeded successfully.");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
