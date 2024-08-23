import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

type SendMailOptions = {
  subject: string;
  text: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
};

export async function sendMail(options: SendMailOptions) {
  const info = await transporter.sendMail({
    from: '"Celo Reis 👻" <hello@celoreis.dev>',
    to: "oi@celoreis.dev",
    subject: options.subject,
    text: options.text,
    attachments: options.attachments,
  });

  return info;
}
