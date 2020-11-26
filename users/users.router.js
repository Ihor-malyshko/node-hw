const { Router } = require("express");
const { authorize } = require("../helpers/authorize.middeleware");
const { getCurrentUser } = require("./users.controller");

const router = Router();

router.get("/current", authorize, getCurrentUser);

exports.usersRouter = router;
