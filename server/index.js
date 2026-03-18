import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

// ── Helpers ───────────────────────────────────────────────────────────────────

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ESC[c]);

const verifyRecaptcha = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return; // skip verification when not configured (development)
    if (!token) throw new Error('reCAPTCHA token is missing.');

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    if (!data.success) throw new Error('reCAPTCHA verification failed.');
};

// ── Server setup ──────────────────────────────────────────────────────────────

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000' }));
app.use(bodyParser.json());

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;
if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error(
        '[server] Missing required environment variables: EMAIL_USER and/or EMAIL_PASSWORD.\n' +
        'Ensure server/.env is present and contains both values before starting.'
    );
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
});

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please wait 15 minutes before trying again.' },
});

// ── Routes ────────────────────────────────────────────────────────────────────

app.post('/api/contact', contactLimiter, async (req, res) => {
    const { email, name, number, description, recaptchaToken } = req.body;

    try {
        await verifyRecaptcha(recaptchaToken);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    if (!email || !name || !number || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const safeName        = escapeHtml(name);
    const safeEmail       = escapeHtml(email);
    const safeNumber      = escapeHtml(number);
    const safeDescription = escapeHtml(description);

    const adminHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #007bff;">New Contact Form Submission from ${safeName} on ${new Date().toLocaleDateString()}</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safeNumber}</p>
        <p><strong>Message:</strong> ${safeDescription}</p>
    </div>
    `;

    const userHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <p>Hi ${safeName},</p>
        <p>Thank you for contacting me! I have received your message and will get back to you as soon as possible. You can also reply to this email for any further questions.</p>
        <p>Best regards,</p>
        <p>Abhinash Pritiraj</p>
    </div>
    `;

    const adminMailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        subject: 'New Contact Form Submission',
        html: adminHTML,
    };

    const userMailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        html: userHTML,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending admin email:', error);
            return res.status(500).json({ error: 'Failed to send email to admin' });
        }

        console.log('Admin email sent successfully:', info.response);

        transporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
                console.error('Error sending user email:', error);
                return res.status(500).json({ error: 'Failed to send email to user' });
            }
            console.log('User email sent successfully:', info.response);
            return res.status(200).json({ success: true, message: 'Email sent successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});