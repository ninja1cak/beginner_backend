const model = require('../models/user')
const ctrl = {}
const hash = require('../util/hash') 
ctrl.insertDataUser = async (req, res) =>{
  
  const hashPassword = await  hash(req.body.password_user)

  const parameter = {
    ...req.body,
    password_user : hashPassword
  }
  const {username, password_user,email_user} = parameter
  
  const result = await model.addUser({username, password_user, email_user})
  return res.send(result)
}

module.exports = ctrl