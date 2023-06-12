const ctrl = {}
const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('../util/jwt')
const jwtMod = require('jsonwebtoken')


require('dotenv/config')

ctrl.login = async (req, res) =>{
  try {
    console.log('tes')

    const {username} = req.body
    
    const dataUserFromDB = await model.readByUser(username)
    

    console.log(dataUserFromDB)
    
    if(dataUserFromDB.length<= 0){
      return res.send({
        status: "login failed",
        message: "Username not registered"
      })
    }

    if(dataUserFromDB[0].status == 'pending'){
      return res.send({
        status: 'login failed',
        message: 'account not verified'
      })
    }
    
    const passwordFromDB = dataUserFromDB[0].password_user
    const role = dataUserFromDB[0].role
    const id_user = dataUserFromDB[0].id_user
    
    const isPassword = await bcrypt.compare(req.body.password_user, passwordFromDB)
  
    if(isPassword){
      const token = jwt.generateToken(username,role, id_user)
      return res.send({
        status : "login success",
        message: "token created",
        token
      })
      
    }else{
      return res.send({
        status : "login failed",
        message : "Wrong password"
      })
    }
        
    //return res.send(dataUserFromDB)
    
  } catch (error) {
    return error
  }

}

ctrl.verifyUser = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const {token} = req.params

    jwtMod.verify(token, process.env.KEY, (error, decode) =>{
      if(error){
        return res.send("verification fail")
      }
      req.email = decode
    })
  
    if(req.email){
      const params = {
        email_user : req.email,
        status : 'active'
      }
      await model.updateDataStatus(params)
      return res.send({
        status : 'verification success',
        message: 'Silahkan login kembali'
      })
    }
  
    
  } catch (error) {
    throw error
  }
 
}

module.exports = ctrl