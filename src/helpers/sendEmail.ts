import nodemailer from 'nodemailer';
import { mailHTML } from './mailHTML';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string, url: string, type: string) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '<tutornia.project@gmail.com>',
    to: email,
    subject: `Tutornia ${type}`,
    text: url,
    html: mailHTML(url, type),
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', await nodemailer.getTestMessageUrl(info));
}
