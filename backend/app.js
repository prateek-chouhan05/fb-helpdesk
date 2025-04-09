require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
