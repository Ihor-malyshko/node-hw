const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail = async (user) => {
  const verificationLink = `http://localhost:${process.env.PORT}/auth/verify/${user.verificationToken}`;

  const msg = {
    to: user.email, // Change to your recipient
    from: process.env.SGMAIL_FROM, // Change to your verified sender
    subject: "Рассылка новостей",
    // text: "and easy to do anywhere, even with Node.js",
    html: `<p>Доброго времени суток.</p>
    <p>Это шаблонное письмо для оповещения наших партнеров о новостях компании)), прайс отправить</p>
    <p></p>
    <p>Теперь я умею такое делать. Массовая рассылка писем, ограничение 100 писем в день. Если больше платно.</p>
    <p>Можно еще картинку вставить, файл прикрепить ну и многое другое</p>
    <p><a href=http://technocont.com/>Наш сайт</a></p>`,
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
