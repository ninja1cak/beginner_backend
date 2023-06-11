const ctrl = {}
const model = require('../models/booking')
const {respons} = require('../util/respons')


ctrl.insertDataBooking = async (req, res) =>{
  try {
    const {      
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method} = req.body
    
    

    const result = await model.addDataBooking({      
      id_movie,
      id_schedule,
      total_prices_booking,
      seats_booking,
      watch_date,
      payment_method,
      id_user : req.id
      })
    
    return respons(res, 200, result)

  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.getDataBooking = async (req, res) =>{
  try {
    
    console.log(req.id)
    const {page, limit} = req.query
    const params = {
      page : page || 1,
      limit : limit || 2
    }
    const result = await model.readDataBooking(req.id, params)

    return respons(res, 200, result)

  } catch (error) {
    return respons(res, 500, error.message)
  }
}


// ctrl.changeDataBooking = async (req,res) =>{
//   try {
//     const {id_booking} = req.params
//     const {payment_method} = req.body
//     const result = await model.updateDataBooking({payment_method, id_booking})
//     return res.status(200).json(result)
    
//   } catch (error) {
//     return res.send(error)
//   }
// }

ctrl.changeDataBooking = async (req,res) =>{
  try {
    


    const {id_booking} = req.params
    const {id_movie, seats_booking, id_schedule, watch_date ,payment_method, total_prices_booking} = req.body
    const result = await model.updateDataBooking({id_movie, seats_booking, id_schedule, watch_date, payment_method, id_booking, total_prices_booking})
    return respons(res, 200, result)
    
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.removeDataBooking = async (req, res) => {
  try{
    

    const {id_booking} = req.params
    const result = await model.deleteDataBooking({id_booking})
    return respons(res, 200, result)

  }catch(error){
    return respons(res, 500, error.message)
  }
}

module.exports = ctrl