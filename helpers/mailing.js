const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail = async (user) => {
  const verificationLink = `http://localhost:${process.env.PORT}/auth/verify/${user.verificationToken}`;

  const msg = {
    to: user.email, // Change to your recipient
    from: process.env.SGMAIL_FROM, // Change to your verified sender
    subject: "Email verification",
    // text: "and easy to do anywhere, even with Node.js",
    html: `<p>
      Hello ${user.username}! Please verify your email by following next link.
      <a href=${verificationLink}>verification link</a>
      </p>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

// exports.mailing = new Mailing();
