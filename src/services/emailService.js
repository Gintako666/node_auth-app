import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD,
  },
});

export function send({ email, subject, html }) {
  return transporter.sendMail({
    from: 'Auth API',
    to: email,
    subject,
    text: '',
    html,
  });
}

export function sendActivationLink(email, token) {
  const link = `${process.env.CLIENT_URL}/#/activate/${token}`;

  return send({
    email,
    subject: 'Accoun activation',
    html: `
      <h1>Accoun activation</h1>
      <a href="${link}">${link}</a>
    `,
  });
}

export const emailService = {
  send,
  sendActivationLink,
};
