const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const { register, login, logout } = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.schemes");
const { authorize } = require("../helpers/authorize.middleware");

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.delete("/logout", authorize, logout);

exports.authRouter = router;
