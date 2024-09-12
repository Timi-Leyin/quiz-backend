import { emailTransporter } from "../config/email";
import { MailOptions } from "../types/helpers";
import nodemailer from "nodemailer";

// FOR TEST ENV ONLY
export default async (mailOptions: MailOptions) => {
  emailTransporter.sendMail(
    {
      from: "noreply@tcag.art",
      ...mailOptions,
    },
    (error, info) => {
      if (error) {
        return console.log("[ERROR] Email not sent ❌");
      }
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  );
};
