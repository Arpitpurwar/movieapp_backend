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

const mailData = {
    from: 'crm-notification-service@gmail.com',
    to: 'purwarap333@gmail.com',
    subject: 'heyy!!!!! Sending Email using Node.js',
    text: 'That was easy!',
    html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
};
transporter.sendMail(mailData, function (err, info) {
    if (err)
        console.log(err)
    else
        console.log(info);
});

//https://myaccount.google.com/lesssecureapps hit this link to allow your less secure app access gmail