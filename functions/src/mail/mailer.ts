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
    from: '"Celo Reis 👻" <hello@celoreis.dev>', // sender address
    to: "oi@celoreis.dev", // list of receivers
    subject: options.subject,
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>",
    attachments: options.attachments,
  });

  return info;
}
