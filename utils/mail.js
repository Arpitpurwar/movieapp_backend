const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'purwarap333@gmail.com',
        pass: 'hhepltfumxqccycq',
    },
    secure: true,
});

// https://miracleio.me/snippets/use-gmail-with-nodemailer/

async function sendMail(subject, body, to){
     const mailData = {
        from: 'crm-notification-service@gmail.com',
        to: to,
        subject: subject,
        text: body
    };
    try{
        const info = await transporter.sendMail(mailData);
        console.log('Mail sent successfully', info);
    }catch(err){
        console.log('Error while sending email', err);
        throw err;
    }
    
}

module.exports = {
    sendMail
}