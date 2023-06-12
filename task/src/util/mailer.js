const nodemailer = require('nodemailer')
require('dotenv/config')


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hauzan41200@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD
  }
})



const configSendaMail =  (email, confirmationCode) => {
  const mailOptions = {
    from: 'hauzan41200@gmail.com',
    to: email,
    subject: 'subject',
    text: `Buka link ini untuk verifikasi akun: localhost:8888/auth/${confirmationCode}`
  }
  transporter.sendMail(mailOptions,( error, info) => {
    if(error){
      console.log(error);
    }else{
      console.log('email sent:', info.response)
    }
  } )
}


module.exports = configSendaMail