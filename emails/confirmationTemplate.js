const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendConfirmationEmail = async (to, name) => {
    await transporter.sendMail({
        from: `"SJD Alumni" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Confirmation de votre réponse au sondage",
        html: `<p>Merci <strong>${name}</strong> pour votre participation !</p>
           <p>Votre Sondage a bien été reçu.</p>`,
    });
};

module.exports = sendConfirmationEmail;
