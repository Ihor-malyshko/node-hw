const { serializeUser } = require("./users.serializer");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};
