require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const testimoniRoutes = require("./routes/testimoniRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
