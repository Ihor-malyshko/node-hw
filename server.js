const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { contactsRouter } = require("./contacts/contacts.router");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/users.router");

const multer = require("multer");
const IMAGES_PATH = path.join(__dirname, "public/tmp");

exports.CrudServer = class {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/contacts", contactsRouter);
    this.server.use("/auth", authRouter);
    this.server.use("/users", usersRouter);
    this.server.use("/images", express.static(IMAGES_PATH));
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
