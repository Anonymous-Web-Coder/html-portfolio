const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Choose any available port

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (if any)
app.use(express.static('public'));

//*// Define your email sender configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourgmail@gmail.com', // Your Gmail email address
        pass: 'yourgmailpassword' // Your Gmail password
    }
});

// Define the route to handle form submissions
app.post('/send-email', (req, res) => {
    const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

    // Define email content
    const mailOptions = {
        from: 'Your Name <yourgmail@gmail.com>',
        to: 'moyo.miles99@gmail.com', // Your receiving email address
        subject: contactSubject,
        text: `Name: ${contactName}\nEmail: ${contactEmail}\nSubject: ${contactSubject}\nMessage: ${contactMessage}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error: Unable to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
