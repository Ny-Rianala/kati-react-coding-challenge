const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
  const { name, product_owner_email, user_email, subject, content } = req.body;
  try {
    const payload = {
      from: `${name}<e-commerce.platforme@onja.org>`,
      to: product_owner_email,
      subject,
      reply_to: user_email,
      react: content
    };

    const emailRes = await resend.emails.send(payload);
    res.status(200).json({ ...emailRes });
  } catch (error) {
    res.status(500).json({ message: error.message || "An error has occurred" });
  }
};

module.exports = sendEmail;
