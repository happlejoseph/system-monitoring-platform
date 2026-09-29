

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});



export const sendEmail = async(to, subject, message)=> {

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        });

        console.log("Email sent successfully");
    }
    catch(error) {
        console.error("Failed to send email:", error.message);
    }
}