# Gigslance Email API Documentation

The Gigslance Email API allows you to send personalized emails to your CSV email list using Node.js, Express.js, and Nodemailer.

## Prerequisites

Before using the API, ensure you have the following:

- Node.js and npm installed on your machine.
- SMTP server details including host, port, username, and password.
- A domain name with SMTP records set up.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install the dependencies:

```bash
cd gigslance-email-api
npm install
```

## Configuration

In order to use the API, you need to configure the SMTP settings and other parameters. Follow these steps:

1. Open `index.js` file in the project root directory.

2. Locate the following section:

```javascript
// Define your SMTP settings
const smtpConfig = {
  host: 'your_smtp_host',
  port: 587,
  secure: false, // Set to true if using SSL
  auth: {
    user: 'your_username',
    pass: 'your_password',
  },
};
```

3. Replace `'your_smtp_host'`, `'your_username'`, and `'your_password'` with your actual SMTP server details.

## Sending Emails

To send personalized emails to your CSV email list, follow these steps:

1. Prepare your CSV file with the following columns: `firstName`, `lastName`, and `email`. Ensure the file is correctly formatted.

2. Create an HTML email template file named `template.html` in your codebase and include the desired content. You can use placeholders like `[First Name]` and `[Last Name]` to be dynamically replaced later.

3. Update the `/sendEmails` route in the Express.js code:

- Open `index.js` file in the project root directory.
- Locate the following section:

```javascript
app.post('/sendEmails', (req, res) => {
  const { subject, csvFilePath } = req.body;

  // Read the HTML email template file
  const htmlTemplate = fs.readFileSync('path_to_your_template_file.html', 'utf-8');

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      const { firstName, lastName, email } = data;

      // Create a Nodemailer transporter for each email
      const transporter = nodemailer.createTransport(smtpConfig);

      // Generate the personalized email content
      const personalizedMessage = htmlTemplate
        .replace('[First Name]', firstName)
        .replace('[Last Name]', lastName);

      // Configure the email options
      const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: subject,
        html: personalizedMessage,
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
```

4. When making a POST request to the `/sendEmails` endpoint, include the `"subject"` and `"csvFilePath"` fields in the request body. The `"subject"` field should contain the subject of the email, and the `"csvFilePath"` field should contain the path to your CSV file.

   Example POST request using cURL:

   ```bash
   curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
       "subject": "Welcome to Gigslance!",
       "csvFilePath": "./path/to/your/csv/file.csv"
     }' \
     http://localhost:3000/sendEmails
   ```

   Replace `http://localhost:3000` with the appropriate URL if your server is running on a different host or port.

5. The API will read the HTML template file and the CSV file provided in the request. It will then send personalized emails to each recipient in the CSV file, using the information from the CSV file to replace the placeholders in the email template.

6. Upon successful execution, the API will log the status of each email sent in the console. If any errors occur during the process, they will be logged as well.

## Usage

1. Start the server by running the following command:

   ```bash
   npm start
   ```

2. Make a POST request to the `/sendEmails` endpoint using a tool of your choice (e.g., cURL, Postman). Include the `"subject"` and `"csvFilePath"` fields in the request body.

3. The API will send personalized emails to each recipient in the CSV file using the provided email template.

## Conclusion

Congratulations! You have successfully set up and used the Gigslance Email API to send personalized emails to your CSV email list. You can customize the HTML email template and CSV file according to your requirements.

Feel free to explore and extend the functionality of the API to suit your specific needs. If you encounter any issues or have further questions, please don't hesitate to reach out for support.

Happy emailing!
