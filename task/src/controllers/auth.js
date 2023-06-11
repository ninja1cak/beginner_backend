const ctrl = {}
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('../util/jwt')



require('dotenv/config')

ctrl.login = async (req, res) =>{
  try {
    console.log('tes')

    const {username} = req.body
    const dataUserFromDB = await model.readByUser(username)
    console.log(dataUserFromDB)

    if(dataUserFromDB.length<= 0){
      return res.send({
        status: "Gagal login",
        message: "Username tidak terdaftar"
      })
    }
    
    const passwordFromDB = dataUserFromDB[0].password_user
    const role = dataUserFromDB[0].role
    const id_user = dataUserFromDB[0].id_user
    
    const isPassword = await bcrypt.compare(req.body.password_user, passwordFromDB)
  
    if(isPassword){
      const token = jwt.generateToken(username,role, id_user)
      return res.send({
        status : "berhasil login",
        message: "token created",
        token
      })
      
    }else{
      return res.send({
        status : "Gagal login",
        message : "Password salah"
      })
    }
        
    //return res.send(dataUserFromDB)
    
  } catch (error) {
    return error
  }

}

module.exports = ctrl