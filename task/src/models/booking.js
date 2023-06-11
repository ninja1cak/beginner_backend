const model = {}
const database = require('../config/database')


// model.addDataBooking = ({
  // id_movie,
  // id_schedule,
  // seats_booking,
  // total_prices_booking,
  // watch_date,
  // payment_method
//   }) =>{
  
//     return new Promise ((resolve, reject) =>{
//     database.query(`INSERT INTO public.booking (
//       id_movie,
//       id_schedule,
//       seats_booking,
//       total_prices_booking,
//       watch_date,
//       payment_method
//     ) VALUES ($1, $2, $3, $4, $5, $6)`, [
//       id_movie,
//       id_schedule,
//       seats_booking,
//       total_prices_booking,
//       watch_date,
//       payment_method
//     ])
//     .then((result) => {
//       resolve("data berhasil di input")
//     })
//     .catch((e)=>{
//       reject("data gagal di input")
//     })
//   })
// }

model.addDataBooking = ({      
  id_movie,
  id_schedule,
  total_prices_booking,
  seats_booking,
  watch_date,
  payment_method,
  id_user }) =>{
    console.log({id_user})
    return new Promise((resolve, reject)=>{
    database.query(`INSERT INTO public.booking(
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method,
      id_user
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method,
      id_user     
    ])
    .then((result) =>{
      resolve(`${result.rowCount} data booking succesfully added`)
    })
    .catch((e) =>{
      reject(e)
    })
  })
}

// model.readDataBooking = (id_user) =>{
//   return new Promise ((resolve, reject) =>{
//     console.log(id_user)
//     database.query(`SELECT * FROM public.booking WHERE id_user = $1 ORDER BY id_booking ASC `, [id_user])
//     .then((result) =>{
//       resolve(result.rows)
//     })
//     .catch((e) => {
//       reject(e)
//     })
//   })
// }

model.readDataBooking = async (id_user, {page, limit}) =>{
 // eslint-disable-next-line no-useless-catch
 try {
    const totalData = await database.query(`SELECT COUNT(id_user) FROM public.booking WHERE id_user = $1`,[id_user])
    const count = totalData.rows[0].count
    const offset = (limit-1) * page
    const getData = await database.query(`SELECT * FROM public.booking WHERE id_user = $1 LIMIT $2 OFFSET $3`,[id_user, limit, offset])
    const meta = {
      next: count <= 0 ? null : count/limit == page ? null : Number(page) + 1,
      previous: page == 1 ? null : Number(page) - 1,
      total : count
    }

    const data = {
      meta,
      data: getData.rows
    }

    return data
 } catch (error) {
    throw error
 }
}

model.updateDataBooking = ({id_movie, seats_booking, id_schedule, watch_date, payment_method,id_booking, total_prices_booking}) =>{
  return new Promise((resolve,reject) =>{
    console.log(total_prices_booking)
    database.query(`UPDATE public.booking 
    SET 
      id_movie = $1,
      seats_booking = ARRAY[$2],
      id_schedule = $3,
      watch_date = $4,
      payment_method = COALESCE(NULLIF($5, ''), payment_method),
      total_prices_booking = $6
      
    WHERE id_booking = $7`,[id_movie, seats_booking, id_schedule, watch_date,payment_method, total_prices_booking, id_booking])
    .then((result)=>{
      resolve(`${result.rowCount} data booking succesfully updated`)
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })

  })
}

model.deleteDataBooking = ({id_booking}) =>{
  return new Promise((resolve,reject)=>{
    database.query(`DELETE FROM public.booking
    WHERE id_booking = $1`, [id_booking])
    .then((result) =>{
      resolve(`${result.rowCount}data booking succesfully deleted`)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

module.exports = model