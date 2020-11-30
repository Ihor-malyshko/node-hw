exports.serializeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    avatarURL: user.avatarURL,
    subscription: user.subscription,
  };
};
