const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarURL: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    tokens: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// collection name => contacts
exports.UserModel = mongoose.model("User", userSchema);
