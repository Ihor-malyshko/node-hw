const { serializeUser } = require("./users.serializer");
const { UserModel } = require("./users.model");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};

exports.updateUsersSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(serializeUser(updatedUser));
  } catch (err) {
    next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        avatarURL: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(serializeUser(updatedUser));
  } catch (err) {
    next(err);
  }
};
