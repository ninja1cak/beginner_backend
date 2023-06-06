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
  payment_method}) =>{
  
    return new Promise((resolve, reject)=>{
    database.query(`INSERT INTO public.booking(
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method
    ) VALUES ($1, $2, $3, $4, $5, $6)`, [
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method     
    ])
    .then((result) =>{
      resolve("data booking succesfully added")
    })
    .catch((e) =>{
      reject("Failed to add data booking")
    })
  })
}

model.readDataBooking = () =>{
  return new Promise ((resolve, reject) =>{
    database.query(`SELECT * FROM public.booking ORDER BY id_booking ASC`)
    .then((result) =>{
      resolve(result.rows)
    })
    .catch((e) => {
      reject("failed to read data booking")
    })
  })
}

model.updateDataBooking = ({payment_method,id_booking}) =>{
  return new Promise((resolve,reject) =>{
    
    database.query(`UPDATE public.booking 
    SET payment_method = $1 
    WHERE id_booking = $2`,[payment_method, id_booking])
    .then((result)=>{
      resolve("data booking succesfully updated")
    })
    .catch((reject) => {
      reject("Failed to update data booking")
    })

  })
}

model.deleteDataBooking = ({id_booking}) =>{
  return new Promise((resolve,reject)=>{
    database.query(`DELETE FROM public.booking
    WHERE id_booking = $1`, [id_booking])
    .then((result) =>{
      resolve("data booking succesfully deleted")
    })
    .catch((error)=>{
      reject("Failed to deleted data booking")
    })
  })
}

module.exports = model