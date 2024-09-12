import nodemailer from "nodemailer";
import { ENV } from "../constants/env";

export const emailTransporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});
