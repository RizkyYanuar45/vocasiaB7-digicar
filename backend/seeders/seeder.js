require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");
const Car = require("../models/Car");
const Blog = require("../models/Blog");
const Contact = require("../models/Contact");
const Testimoni = require("../models/Testimoni");
const { mongoUri } = require("../configs/env");

const users = [
  {
    name: "Admin Yusa",
    email: "kel4b7@gmail.com",
    username: "adminyusa",
    password: "admin123",
    role: "admin",
  },
];

const cars = [
  {
    tahun: "2022",
    name: "Toyota Avanza",
    description: "Mobil keluarga yang nyaman dan luas.",
    pricePerDay: 300000,
    image: "uploads/Avanza2022.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2021",
    name: "Honda Brio",
    description: "Mobil kecil yang cocok untuk perkotaan.",
    pricePerDay: 250000,
    image: "uploads/brio2021.jpeg",
    isUsed: "Ready",
  },
  {
    tahun: "2024",
    name: "Wuling Cortez",
    description: "Mobil dengan kapasitas luas dan fitur modern.",
    pricePerDay: 450000,
    image: "uploads/wulingcortez.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2021",
    name: "Toyota Rush",
    description: "Mobil SUV yang cocok untuk petualangan.",
    pricePerDay: 400000,
    image: "uploads/toyotarush.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2020",
    name: "Nissan Livina",
    description: "Mobil keluarga yang luas dan nyaman.",
    pricePerDay: 350000,
    image: "uploads/NissanLivina.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2020",
    name: "Suzuki Ertiga",
    description: "Mobil dengan kapasitas penumpang yang banyak.",
    pricePerDay: 370000,
    image: "uploads/suzuki2020.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2020",
    name: "Isuzu Elf",
    description: "Mobil dengan kapasitas besar untuk perjalanan jauh.",
    pricePerDay: 500000,
    image: "uploads/isuzuElf2020.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2018",
    name: "Honda Mobilio",
    description: "Mobil yang cocok untuk keluarga dengan banyak penumpang.",
    pricePerDay: 320000,
    image: "uploads/HondaMobilio.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2024",
    name: "Toyota Alphard",
    description: "Mobil premium dengan kenyamanan maksimal.",
    pricePerDay: 800000,
    image: "uploads/ToyotaAlphard.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2024",
    name: "Daihatsu Sigra",
    description: "Mobil kompak yang efisien untuk keluarga.",
    pricePerDay: 300000,
    image: "uploads/DaihatsuSigra.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2024",
    name: "Daihatsu Xenia",
    description: "Mobil dengan ruang yang luas dan nyaman.",
    pricePerDay: 350000,
    image: "uploads/DaihatsuXenia.jpg",
    isUsed: "Ready",
  },
  {
    tahun: "2024",
    name: "Daihatsu Terios",
    description: "Mobil SUV yang siap untuk segala medan.",
    pricePerDay: 400000,
    image: "uploads/DaihatsuTerios.jpg",
    isUsed: "Ready",
  },
];

const blogs = [
  {
    title: "Tips Perawatan Mobil Selama Musim Hujan",
    category: "Seputar Mobil",
    thumbnail: "uploads/perawatanMobil.jpeg",
    content:
      "Berikut adalah beberapa tips penting untuk merawat mobil Anda selama musim hujan : 1. pakaikan jas hujan, 2. berteduh di bagasi",
    author: "Yusa",
    slug: "tips-perawatan-mobil-selama-musim-hujan",
  },
  {
    title: "Destinasi Garuda Wisnu Kencana, Liburan Terbaik di Akhir Tahun",
    category: "Destinasi Populer",
    thumbnail: "uploads/GarudaWisnu.jpg",
    content:
      "Jika Anda mencari tempat liburan terbaik di akhir tahun, berikut adalah rekomendasi kami yaitu Patung Garuda Wisnu Kencana",
    author: "Yusa",
    slug: "destinasi-garuda-wisnu-kencana-liburan-terbaik-di-akhir-tahun",
  },
];

const testimonis = [
  {
    user: "Jokowi",
    image: "uploads/Jokowi.png",
    comment: "Proses pemesanan sangat mudah dan cepat",
    rating: 4,
  },
  {
    user: "Xi Jin Ping",
    image: "uploads/XiJinping.jpg",
    comment: "Proses pemesanan sangat mudah dan cepat",
    rating: 5,
  },
  {
    user: "Ronaldo",
    image: "uploads/Ronaldo.jpg",
    comment: "Proses pemesanan sangat mudah dan cepat",
    rating: 4,
  },
  {
    user: "Messi",
    image: "uploads/Messi.jpg",
    comment: "Proses pemesanan sangat mudah dan cepat",
    rating: 5,
  },
];

const contacts = [
  {
    tiktok: "https://www.tiktok.com/@vocasia.id?lang=id-ID",
    instagram: "https://www.instagram.com/vocasia/",
    facebook: "https://web.facebook.com/vocasia/?locale=id_ID&_rdc=1&_rdr",
    youtube: "https://www.youtube.com/@vocasia",
    twitter: "https://x.com/Vocasia_ID",
    linkedln: "https://www.linkedin.com/company/vocasia/?originalSubdomain=id",
    admin_one: "0853-2936-1237",
    admin_two: "0857-7375-5865",
    email: "sdigicar@gmail.com",
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

    await User.create(users);
    console.log("Users seeded successfully.");

    await Car.deleteMany();
    console.log("Previous car data cleared.");

    await Car.create(cars);
    console.log("Cars seeded successfully.");

    await Contact.deleteMany();
    console.log("Previous contact data cleared.");

    await Contact.create(contacts);
    console.log("Contact seeded successfully.");

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
