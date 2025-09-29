import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.trim() 
    
  } });



    await transporter.sendMail({
      from: `"Chitrakoot Yatra" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email send failed:", error);
  }
};
