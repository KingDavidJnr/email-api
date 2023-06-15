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

2. Start the server:

```bash
npm start
```

3. Make a POST request to the `/sendEmails` endpoint:

- URL: `http://localhost:3000/sendEmails`
- Method: `POST`
- Request Body:

```json
{
  "subject": "Your Subject",
  "message": "Your Message",
  "csvFilePath": "path_to_your_csv_file"
}
```

Replace the placeholders with the appropriate values:
- `"Your Subject"`: The subject of the email.
- `"Your Message"`: The body of the email.
- `"path_to_your_csv_file"`: The relative or absolute path to your CSV file.

4. Receive the response:

Upon successful sending of the emails, you will receive a response with the message "Emails sent successfully."

## Email Template

The API uses an HTML email template to compose the emails. You can modify the template to suit your needs. Open `email_template.html` in the project root directory and update the HTML code.

The template includes placeholders for the user's first name and last name:

```html
<h1>Welcome to Gigslance!</h1>
<p>Dear [First Name] [Last Name],</p>
<!-- Rest of the email content -->
```

The placeholders will be replaced with the corresponding values from the CSV file when sending the emails.

## Conclusion

Congratulations! You have successfully set up and used the Gigslance Email API to send personalized emails to your CSV email list. If you have any questions or issues, please contact our support team at support@gigslance.com.

## Important Notes

- Make sure to handle errors, implement security measures, and consider rate limiting or batching if dealing with a large email list.
- Ensure your CSV file is properly formatted with the required columns: `firstName`, `lastName`, and `email`.
- Test the API thoroughly before using it in a production environment.
- Comply with email deliverability best practices to avoid being marked as spam.