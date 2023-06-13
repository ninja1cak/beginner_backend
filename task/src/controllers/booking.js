const ctrl = {}
const model = require('../models/booking')
const modelSchedule = require('../models/schedule')
const {respons} = require('../util/respons')


ctrl.insertDataBooking = async (req, res) =>{
  try {
    const {      
      id_movie,
      id_schedule,
      seats_booking,
      watch_date,
      payment_method} = req.body
    
    
    console.log(seats_booking.length)
    const price_seat = await modelSchedule.readDataScheduleBy({id_schedule})
    console.log()
    const result = await model.addDataBooking({      
      id_movie,
      id_schedule,
      total_prices_booking: price_seat[0].price_seat*seats_booking.length,
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
    const result = await model.readDataBooking(req.role, req.id, params)

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
    
    const {id_booking, id_schedule} = req.params
    const price_seat = await modelSchedule.readDataScheduleBy({id_schedule})
    const {seats_booking} = req.body
    console.log(req.id)
    const result = await model.updateDataBooking({id_user: req.id ,seats_booking, id_booking, total_prices_booking: price_seat[0].price_seat *seats_booking.length})
    
    if(!result) return respons(res, 401, "data booking tidak ditemukan")
    return respons(res, 200, result)
    
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

ctrl.removeDataBooking = async (req, res) => {
  try{
    

    const {id_booking} = req.params
    const result = await model.deleteDataBooking({id_booking, id_user: req.id})
    if(!result) return respons(res, 401, "data booking tidak ditemukan")
    return respons(res, 200, result)

  }catch(error){
    return respons(res, 500, error.message)
  }
}

ctrl.getDetailDataBooking = async (req, res) =>{
  try {
    const params = {
      page: req.query.page || 1,
      limit: req.query.limit || 2,
      id_user: req.id
    }
    const result = await model.readDetailDataBooking(params)
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
    
  }
}

module.exports = ctrl