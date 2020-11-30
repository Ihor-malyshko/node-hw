const { Router } = require("express");
const { validate } = require("../helpers/validate.middleware");
const { authorize } = require("../helpers/authorize.middleware");
const {
  getCurrentUser,
  updateUsersSubscription,
  updateAvatar,
} = require("./users.controller");
const { updateUsersSubscriptionSchema } = require("./users.schemes");
const { uploadImage } = require("../helpers/uploadImage.middleware");
const { compressImage } = require("../helpers/compressImage.middleware");

const router = Router();

router.get("/current", authorize, getCurrentUser);

router.patch(
  "/",
  authorize,
  validate(updateUsersSubscriptionSchema),
  updateUsersSubscription
);

router.post("/avatars", authorize, uploadImage, compressImage, updateAvatar);

exports.usersRouter = router;
