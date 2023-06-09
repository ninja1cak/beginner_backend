const model = require('../models/user')

const validate = async (req, res, next) =>{
  try {
    const {username, email_user} = req.body
    console.log(req.body)
    console.log(username)
    const result = await model.readByUser(username)
    //console.log(result[0].username)
    //console.log(result[0].username)
    if(result == ''){
      console.log('lewat if result')
      return next()
    }
    
    if(username === result[0].username){
      return res.send("USERNAME TELAH DIGUNAKAN")
    }


  } catch (error) {
   return res.send(error)
  }





}

module.exports = validate