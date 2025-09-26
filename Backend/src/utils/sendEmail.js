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
    
  },
  
  logger: true,
  debug: true,
  tls: {
    rejectUnauthorized: false
  },
  greetingTimeout: 10000,
  connectionTimeout: 10000,
  socketTimeout: 10000
  
});
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass length:", process.env.EMAIL_PASS?.length);


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
