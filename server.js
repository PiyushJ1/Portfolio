const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: 'https://www.piyushj.dev'
}));
app.use(express.json());
app.use(express.static('public'));

app.post('/send-message', async (req, res) => {
    console.log('Incoming message:', req.body);

    const { firstName, lastName, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Message from ${firstName} ${lastName}`,
            text: `Email: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});
    