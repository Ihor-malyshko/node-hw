const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

//
server.use(morgan("tiny"));
server.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

server.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});

server.get("/", (req, res) => res.send("Test message"));
