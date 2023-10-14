const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const ideasRouter = require("./routes/idea");
const path = require("path");

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors Middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/ideas", ideasRouter);

app.use(express.static(path.join(__dirname, "public")));
