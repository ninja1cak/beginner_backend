const model = {}
const database = require('../config/database')



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

model.updateDataBooking = ({seats_booking, id_booking, total_prices_booking, id_user}) =>{
  return new Promise((resolve,reject) =>{
    console.log(total_prices_booking)
    database.query(`UPDATE public.booking 
    SET 
     
      seats_booking = $1,
      total_prices_booking = $2
      
    WHERE id_booking = $3 AND id_user = $4`,[seats_booking, total_prices_booking, id_booking, id_user])
    .then((result)=>{
      if(result.rowCount <= 0 ){
        resolve(false)
      }
      resolve(`${result.rowCount} data booking succesfully updated`)
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })

  })
}

model.deleteDataBooking = ({id_booking, id_user}) =>{
  return new Promise((resolve,reject)=>{
    database.query(`DELETE FROM public.booking
    WHERE id_booking = $1 AND id_user = $2`, [id_booking, id_user])
    .then((result) =>{
      if(result.rowCount == 0) resolve(false)
      resolve(`${result.rowCount}data booking succesfully deleted`)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

module.exports = model