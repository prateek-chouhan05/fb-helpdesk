require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const { pinoHttpLogger } = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const facebookRoutes = require("./routes/facebookRoutes");
const { PORT } = require("./config");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Logger
app.use(pinoHttpLogger);

app.use(express.json());

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/facebook", facebookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
