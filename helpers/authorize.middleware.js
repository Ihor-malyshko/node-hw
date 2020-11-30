const jwt = require("jsonwebtoken");
const { Unauthorized } = require("./errors");
const { UserModel } = require("../users/users.model");

exports.authorize = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Unauthorized("Token is not provided or is not vslid");
    }

    const user = await UserModel.findOne({
      _id: payload.userId,
      tokens: token,
    });
    if (!user) {
      throw new Unauthorized("Token is not valid");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
};
