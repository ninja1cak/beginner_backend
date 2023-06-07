const ctrl = {}
const model = require('../models/user')

ctrl.login = async (req, res) =>{
  try {
    const {username} = req.body

    const dataUserFromDB = await model.getByUser({username})
    
    const passwordFromDB = dataUserFromDB[0].password_user

    if(dataUserFromDB.length<= 0){
      return res.send("user tidak terdaftar")
    }

    if(passwordFromDB === req.body.password_user){
      return res.send("anda berhasil login")
    }else{
      return res.send("password salah")
    }
    
    
    //return res.send(dataUserFromDB)
    
  } catch (error) {
    return error
  }

}

module.exports = ctrl