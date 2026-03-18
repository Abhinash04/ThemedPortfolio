import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000' }));
app.use(bodyParser.json());

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;
if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error(
        '[server] Missing required environment variables.'
    );
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

app.post('/api/contact', (req, res) => {
    const { email, name, number, description } = req.body;
    if (!email || !name || !number || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const adminHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #007bff;">New Contact Form Submission from ${name} on ${new Date().toLocaleDateString()}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong> ${description}</p>
    </div>
    `;

    const userHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <p>Hi ${name},</p>
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