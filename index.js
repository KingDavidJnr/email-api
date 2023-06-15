const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config()

app.use(express.json());

// Define your SMTP settings
const smtpConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  secure: process.env.SECURE, // Set to true if using SSL
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
};

// Read CSV file and send personalized emails
app.post('/sendEmails', (req, res) => {
  const { subject, csvFilePath } = req.body;

  // Read the HTML email template file
  const htmlTemplate = fs.readFileSync('./public/html/welcomeEmail.html', 'utf-8');


  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport(smtpConfig);

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Extract the necessary fields from each row
      const { first_name, last_name, email } = data;

      // Generate the personalized email content
      const personalizedMessage = htmlTemplate
        .replace('[First Name]', first_name)
        .replace('[Last Name]', last_name);

      // Configure the email options
      const mailOptions = {
        from: 'notifications@gigslance.com',
        to: email,
        subject: subject,
        message: personalizedMessage,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${email}:`, error);
        } else {
          console.log(`Email sent to ${email}:`, info.response);
        }
      });
    })
    .on('end', () => {
      console.log('Emails sent successfully');
      res.send('Emails sent successfully');
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).send('Error reading CSV file');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
