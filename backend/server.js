require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const testimoniRoutes = require("./routes/testimoniRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes"); 

connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
