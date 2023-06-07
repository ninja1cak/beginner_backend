const jwt = require('jsonwebtoken')
require('dotenv/config')
const check = (req, res, next) =>{
  const {authorization} = req.headers
  console.log(req.headers)
  if(!authorization){
    return res.send("silahkan login")
  }
  const token = authorization.replace("Bearer ", '')
  jwt.verify(token, process.env.KEY, (err, decode) => {
    if(err){
      return res.send("authentifikasi error")
    }
    console.log(decode)
    req.user = decode.data
    return next()

  })

}

module.exports = check