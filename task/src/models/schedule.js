const model = {}
const database = require('../config/database')

model.addDataSchedule = ({      
  id_movie, 
  date_start, 
  date_end, 
  cinema_name, 
  cinema_address, 
  time_playing, 
  price_seat, 
  cinema_logo_url}) =>{
  
    return new Promise((resolve, reject)=>{
    database.query(`INSERT INTO public.schedule(
      id_movie, 
      date_start, 
      date_end, 
      cinema_name, 
      cinema_address, 
      time_playing, 
      price_seat, 
      cinema_logo_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
      id_movie,
      date_start,
      date_end, 
      cinema_name, 
      cinema_address, 
      time_playing, 
      price_seat, 
      cinema_logo_url
    ])
    .then((result) =>{
      resolve("data schedule succesfully added")
    })
    .catch((e) =>{
      reject("failed to add data schedule")
    })
  })
}


model.readDataSchedule = () =>{
  return new Promise((resolve, reject) =>{
    database.query(`SELECT * FROM public.schedule ORDER BY id_schedule ASC`)
    .then((result) => {
      resolve(result.rows)
    })
    .catch((e) => {
      reject("failed to read data schedule")
    })
  })
}

model.updateDataMovie = ({price_seat, id_schedule}) =>{
  return new Promise((resolve, reject) =>{
    database.query(`UPDATE public.schedule 
    SET price_seat = $1 
    WHERE id_schedule = $2`, [price_seat, id_schedule])
    .then((result) => {
      resolve("data schedule succesfully updated")
    })
    .catch((e) => {
      reject("failed to update data schedule")
    })
  })
}

model.deleteDataMovie = ({id_schedule}) =>{
  return new Promise((resolve, reject) => {
    database.query(`DELETE FROM public.schedule WHERE id_schedule = $1`,[id_schedule])
    .then((result)=>{
      resolve("data schedule succesfully deleted")
    })
    .catch((e) =>{
      reject("failed to delete data schedule")
    })
  })
}



module.exports = model