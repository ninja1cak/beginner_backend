const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = {
  generateToken: (data, role) =>{
    const payload = {
      data: data,
      role: role
    }

    const token = jwt.sign(payload, process.env.KEY, {expiresIn:'5h'})
    return token
  }

}