const model = {}
const database = require('../config/database')


model.addUser = ({username, password_user, email_user, role}) =>{
  return new Promise ((resolve, reject) => {
    database.query(`INSERT INTO public.users(
      username,
      password_user,
      email_user,
      role
    ) VALUES ($1, $2, $3, $4)`, [
      username,
      password_user,
      email_user,
      role      
    ]).then((result)=>{
      
      result = "User berhasil dibuat"
      resolve(result)
    }).catch((error)=>{
      error = "data gagal dibuat"
      reject(error)
    })
  })
}

model.readByUser = (username) =>{
  return new Promise ((resolve, reject) => {
    console.log('masuk promise')
    database.query(`SELECT * FROM public.users WHERE username = $1`, [username])
    .then((res) => {
      console.log('masuk then')
      console.log(res.rows)
      resolve(res.rows)
    })
    .catch((error) =>{
      error = "gagal"
      reject(error)
    })

  })
}

model.updateDataByUser = ({username, email_user, password_user, old_username}) =>{
  return new Promise ((resolve, reject) =>{
    console.log({username, email_user, password_user, old_username})
    database.query(`UPDATE public.users 
    SET
      username = COALESCE(NULLIF($1, ''), username),
      email_user = COALESCE(NULLIF($2, ''), email_user),
      password_user = COALESCE(NULLIF($3, ''), password_user)
    WHERE username = $4`, [
      username,
      email_user,
      password_user,
      old_username
    ])
    .then((result) => {
       
      resolve(result)
    })
    .catch((error) =>{
      error = 'update gagal'
      reject(error)
    })
  })
}

model.deleteDataUser = (username) =>{
  return new Promise ((resolve, reject) =>{
    database.query(`DELETE FROM users 
    WHERE username = $1`, [username])
    .then((result) =>{
      result = "delete data user berhaso;"
      resolve(result)
    })
    .catch((error)=>{
      error = "gagal"
      reject(error)
    })
  })
}
module.exports = model