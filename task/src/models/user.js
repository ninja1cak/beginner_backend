const model = {}
const database = require('../config/database')


model.addUser = ({username, password_user, email_user, role, status}) =>{
  return new Promise ((resolve, reject) => {
    database.query(`INSERT INTO public.users(
      username,
      password_user,
      email_user, 
      role,
      status
    ) VALUES ($1, $2, $3, $4, $5)`, [
      username,
      password_user,
      email_user,
      role,
      status      
    ]).then((result)=>{
      
      result = "User created successfully, check email for account verification"
      resolve(result)
    }).catch((error)=>{
      error = "account failed to create"
      reject(error)
    })
  })
}

model.readByUser = (username, email_user) =>{
  return new Promise ((resolve, reject) => {
    console.log('masuk promise')
    database.query(`SELECT * FROM public.users WHERE username = $1 OR email_user = $2`, [username, email_user])
    .then((res) => {
      console.log('masuk then')
      console.log(res.rows)
      resolve(res.rows)
    })
    .catch((error) =>{
      error = "Failed"
      reject(error)
    })

  })
}

model.updateDataByUser = ({username, email_user, password_user, id_user}) =>{
  return new Promise ((resolve, reject) =>{
    console.log({username, email_user, password_user, id_user})
    database.query(`UPDATE public.users 
    SET
      username = COALESCE(NULLIF($1, ''), username),
      email_user = COALESCE(NULLIF($2, ''), email_user),
      password_user = COALESCE(NULLIF($3, ''), password_user)
    WHERE id_user = $4`, [
      username,
      email_user,
      password_user,
      id_user
    ])
    .then((result) => {
       
      resolve(result.rowCount)
    })
    .catch((error) =>{
      error = 'update failed'
      reject(error)
    })
  })
}

model.deleteDataUser = (username) =>{
  return new Promise ((resolve, reject) =>{
    database.query(`DELETE FROM users 
    WHERE username = $1`, [username])
    .then((result) =>{
      result = "delete success"
      resolve(result)
    })
    .catch((error)=>{
      error = "failed"
      reject(error)
    })
  })
}

model.updateDataStatus = ({email_user, status}) =>{
  return new Promise ((resolve, reject) =>{

    database.query(`UPDATE public.users 
    SET
      status = COALESCE(NULLIF($1, ''), status)      
    WHERE email_user = $2`, [
      status,
      email_user
    ])
    .then((result) => {
       
      resolve(result)
    })
    .catch((error) =>{
      error = 'update failed'
      reject(error)
    })
  })
}

module.exports = model