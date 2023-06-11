const model = require('../models/user')

const validate = async (req, res, next) =>{
  try {
    const {username, email_user} = req.body
    console.log(req.body)
    console.log(username)
    const result = await model.readByUser(username, email_user)
    //console.log(result[0].username)
    //console.log(result[0].username)
    if(result == ''){
      console.log('lewat if result')
      return next()
    }
    
    if(username === result[0].username){
      return res.send("USERNAME TELAH TELAH TERDAFTAR")
    }

    if(email_user == result[0].email_user){
      return res.send("EMAIL TELAH TERDAFTAR")
    }


  } catch (error) {
   return res.send(error)
  }





}

module.exports = validate