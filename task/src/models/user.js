const model = {}
const database = require('../config/database')


model.addUser = ({username, password_user, email_user}) =>{
  return new Promise ((resolve, reject) => {
    database.query(`INSERT INTO public.users(
      username,
      password_user,
      email_user
    ) VALUES ($1, $2, $3)`, [
      username,
      password_user,
      email_user
    ]).then((result)=>{
      result = "User berhasil dibuat"
      resolve(result)
    }).catch((error)=>{
      error = "data gagal dibuat"
      reject(error)
    })
  })
}

model.getByUser = ({username}) =>{
  return new Promise ((resolve, reject) => {
    database.query(`SELECT * FROM public.users WHERE username = $1`, [username])
    .then((res) => {
      resolve(res.rows)
    })
    .catch((error) =>{
      error = "gagal"
      reject(error)
    })

  })
}

module.exports = model