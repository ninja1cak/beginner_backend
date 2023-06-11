const model = require('../models/user')
const ctrl = {}
const hash = require('../util/hash') 
const sendActivationMail = require('../util/mailer')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const {respons} = require('../util/respons')

ctrl.insertDataUser = async (req, res) =>{
 
  try {
    const hashPassword = await hash(req.body.password_user)
    console.log(req.body)
    let roleValue = ''
    
    if(req.body?.role == undefined) { //req.body?.role cek apakah ada object role
      roleValue  = 'user'
    }else{
      roleValue = req.body.role
    }
  
    const parameter = {
      ...req.body,
      password_user : hashPassword,
      role : roleValue
    }
    
    const tokenActivation = jwt.sign(req.body.email_user, process.env.KEY)

    sendActivationMail(req.body.email_user, tokenActivation)

    const {username, password_user,email_user, role} = parameter
  
    const result = await model.addUser({username, password_user, email_user, role})
    return respons(res, 201, result)
    
  } catch (error) {
    return respons(res, 500, error.message)
  }

}

ctrl.getDataByUser = async (req, res) =>{
  try {

    const result = await model.readByUser(req.user)

    return respons(res, 200, result)
  } catch (error) {
    throw respons(res, 500, error.message)
  }
}

ctrl.changeDataByUser = async (req, res) =>{
  try {

    let password_user = ''
    if(req.body.password_user != undefined){
      console.log("password")
      password_user = await hash(req.body.password_user)
    }

    const params = {
      ...req.body,
      password_user: password_user,
      id_user : req.id
    }
    console.log(params)

    const result = await model.updateDataByUser(params)
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.removeDataByUser = async (req, res) =>{
  try{
    const result = await model.deleteDataUser(req.user)
    return respons(res, 200, result)
  }catch(error){
    return respons(res, 500, error.message)
  }
}
module.exports = ctrl