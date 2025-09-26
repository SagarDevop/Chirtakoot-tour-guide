import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Sagar.singh44818@gmail.com", 
        pass: "wjyv znpq ondf qlky", 
      },
    });

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
