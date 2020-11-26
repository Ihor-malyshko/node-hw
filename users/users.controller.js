exports.getCurrentUser = (req, res, next) => {
  const { id, email, subscription } = req.user;
  // console.log(email);
  res.status(200).send({ id, email, subscription });
};
