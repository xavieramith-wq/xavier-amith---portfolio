require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

/* 🔗 CONNECT DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ✉️ Mail setup */
const transporter = require("nodemailer").createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("❌ Email transporter error:", err);
  } else {
    console.log("✅ Email transporter ready");
  }
});

/* 🚀 API */
app.post("/contact", async (req, res) => {
  console.log("🔥 Request received");
  try {
    const { name, email, message } = req.body;

    console.log("DATA:", req.body);

    await new Contact({ name, email, message }).save();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ Email config missing. Set EMAIL_USER and EMAIL_PASS in .env");
      return res.status(500).json({ success: false, error: "Email not configured" });
    }

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message - ${name || "Unknown"}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting!",
      text: "We received your message and will reply soon.",
    };

    try {
      await transporter.sendMail(adminMail);
      await transporter.sendMail(userMail);
      console.log("✅ Emails sent (admin + user)");
    } catch (error) {
      console.log("❌ Email Error:", error);
      return res.status(502).json({ success: false, error: "Email send failed" });
    }

    res.json({ success: true });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* SERVER */
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT to a free port in .env.`);
  } else {
    console.error("Server error:", err);
  }
});
