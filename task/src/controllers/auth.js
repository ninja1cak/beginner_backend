const ctrl = {}
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('../util/jwt')

ctrl.login = async (req, res) =>{
  try {
    const {username} = req.body

    const dataUserFromDB = await model.getByUser({username})
    

    if(dataUserFromDB.length<= 0){
      return res.send("user tidak terdaftar")
    }
    const passwordFromDB = dataUserFromDB[0].password_user
    const isPassword = await bcrypt.compare(req.body.password_user, passwordFromDB)
  
    if(isPassword){
      const token = jwt.generateToken(username)
      return res.send({
        status : "berhasil login",
        message: "token created",
        token
      })
    }else{
      return res.send("password salah")
    }
        
    //return res.send(dataUserFromDB)
    
  } catch (error) {
    return error
  }

}

module.exports = ctrl