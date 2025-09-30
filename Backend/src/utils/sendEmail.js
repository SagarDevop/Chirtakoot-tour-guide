import axios from "axios";

export const  sendEmail = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Chitrakoot Yatra",
          email: process.env.BREVO_SENDER_EMAIL, 
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, // ✅ secure key from Render env vars
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "❌ Email failed:",
      err.response?.data || err.message || err
    );
    throw new Error("Email sending failed");
  }
};


