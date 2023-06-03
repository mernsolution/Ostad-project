const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.mernsolution.com',
        port:465,
        secure:true,
        auth: {
            user: "test@mernsolution.com",
            pass: 'rubel!@#1'
        },tls: {
            rejectUnauthorized: false
        },
    });
    let mailOptions = {
        from: 'Ai Text&Image generator <test@mernsolution.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };   
   return  await transporter.sendMail(mailOptions)
}
module.exports=SendEmailUtility