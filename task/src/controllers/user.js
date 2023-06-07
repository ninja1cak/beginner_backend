const model = require('../models/user')
const ctrl = {}

ctrl.insertDataUser = async (req, res) =>{
  const {username, password_user, email_user} = req.body
  const result = await model.addUser({username, password_user, email_user})
  return res.send(result)
}

module.exports = ctrl