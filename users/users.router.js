const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const { authorize } = require("../helpers/authorize.middeleware");
const {
  getCurrentUser,
  updateUsersSubscription,
} = require("./users.controller");
const { updateUsersSubscriptionSchema } = require("./users.schemes");

const router = Router();

router.get("/current", authorize, getCurrentUser);
router.patch(
  "/",
  authorize,
  validate(updateUsersSubscriptionSchema),
  updateUsersSubscription
);

exports.usersRouter = router;
