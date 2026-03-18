import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" }));
app.use(bodyParser.json());

const { MAIL_USER, MAIL_PASS } = process.env;
if (!MAIL_USER || !MAIL_PASS) {
  console.error(
    "[server] Missing required environment variables: MAIL_USER and/or MAIL_PASS.\n" +
    "Create a .env file in the server/ directory with these values before starting."
  );
  process.exit(1);
}

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait 15 minutes before trying again." },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, number, description } = req.body;

  if (!name || !email || !description) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO ?? process.env.MAIL_USER,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${number ?? "—"}\n\n${description}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
