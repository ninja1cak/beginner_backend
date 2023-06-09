const model = require('../models/user')
const ctrl = {}
const hash = require('../util/hash') 

ctrl.insertDataUser = async (req, res) =>{
 
  try {
    const hashPassword = await hash(req.body.password_user)
    console.log(req.body)
    let roleValue = ''
    
    if(req.body?.role == undefined) { //req.body?.r
      roleValue  = 'user'
    }else{
      roleValue = req.body.role
    }
  
    const parameter = {
      ...req.body,
      password_user : hashPassword,
      role : roleValue
    }
    
    const {username, password_user,email_user, role} = parameter
  
    const result = await model.addUser({username, password_user, email_user, role})
    return res.send(result)
    
  } catch (error) {
    return res.send(error)
  }

}

ctrl.getDataByUser = async (req, res) =>{
  try {

    const result = await model.readByUser(req.user)

    return res.send(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.changeDataByUser = async (req, res) =>{
  try {
    const {username, email_user, password_user} = req.body
    const result = await model.updateDataByUser({username, email_user, password_user, old_username: req.user})
    return res.send(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.removeDataByUser = async (req, res) =>{
  try{
    const result = await model.deleteDataUser(req.user)
    return res.send(result)
  }catch(error){
    return res.send(error)
  }
}
module.exports = ctrl