// Server Creation and Data Base Connexion
const express = require("express");
const connectDB = require("./config/connectDB");
const owner = require("./routes/owner");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config({ path: "./config/.env" });

app.use(express.json());

connectDB();

app.use("/owner", owner);

app.listen(process.env.port, (err) => {
  err
    ? console.log("Server connection failed", err)
    : console.log(`Server is connected on port ${process.env.PORT}`);
});

//Error: listen EACCES: permission denied process.env.PORT || 7500
