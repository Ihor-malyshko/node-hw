const bcrypt = require("bcryptjs");
const { Conflict, NotFoung, Forbidden } = require("../helpers/errors");
const { UserModel } = require("../users/users.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    //

    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

    const newUser = await UserModel.create({
      email,
      password: passwordHash,
    });

    res.status(201).send({
      id: newUser._id,
      email,
      subscription: newUser.subscription,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User such email not find");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Forbidden("Password in not correct");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await UserModel.findByIdAndUpdate(user._id, { $push: { tokens: token } });

    return res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { user, token } = req;

    await UserModel.updateOne(
      { _id: user._id },
      {
        $pull: { tokens: token },
      }
    );

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
