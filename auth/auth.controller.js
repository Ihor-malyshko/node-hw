const bcrypt = require("bcryptjs");
const { Conflict, NotFoung, Forbidden } = require("../helpers/errors");
const { UserModel } = require("../users/users.model");
const jwt = require("jsonwebtoken");
const { serializeUser } = require("../users/users.serializer");
const { AvatarGenerator } = require("random-avatar-generator");
const { v4: uuidv4 } = require("uuid");
const { avatartDownloadPromise } = require("../helpers/download");
const { sendVerificationEmail } = require("../helpers/mailing");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

    const generator = new AvatarGenerator();
    generator.generateRandomAvatar();
    const fileName = `${uuidv4()}.svg`;
    const downloadURL = generator.generateRandomAvatar(fileName);

    const IMAGE_PATH = `./public/images/${fileName}`;

    const avatarURL = await avatartDownloadPromise(downloadURL, IMAGE_PATH);

    const newUser = await UserModel.create({
      email,
      password: passwordHash,
      avatarURL,
      verificationToken: uuidv4(),
    });

    await sendVerificationEmail(newUser);

    res.status(201).send(serializeUser(newUser));
  } catch (err) {
    next(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    // console.log("verifyUser", verificationToken);

    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
      throw new NotFound("User with such verification token not found");
    }

    await UserModel.updateOne({ _id: user._id }, { verificationToken: null });

    return res.status(200).send("Your email successfully verified");
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

    if (user.verificationToken) {
      throw new Forbidden("Verify your e-mail");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await UserModel.findByIdAndUpdate(user._id, { $push: { tokens: token } });

    return res.status(200).send({
      user: serializeUser(user),
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
