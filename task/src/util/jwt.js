const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = {
  generateToken: (data) =>{
    const payload = {
      data: data,
      role: 'admin'
    }

    const token = jwt.sign(payload, process.env.KEY, {expiresIn:'5h'})
    return token
  }

}