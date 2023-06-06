const ctrl = {}
const model = require('../models/booking')



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
      payment_method})
    
    return res.status(200).json(result)

  } catch (error) {
    return res.send(error)
  }
}

ctrl.getDataBooking = async (req, res) =>{
  try {
    
    const result = await model.readDataBooking()
    return res.status(200).json(result)

  } catch (error) {
    return res.send(error)
  }
}

ctrl.changeDataBooking = async (req,res) =>{
  try {
    const {id_booking} = req.params
    const {payment_method} = req.body
    const result = await model.updateDataBooking({payment_method, id_booking})
    return res.status(200).json(result)
    
  } catch (error) {
    return res.send(error)
  }
}

ctrl.removeDataBooking = async (req, res) => {
  try{
    
    const {id_booking} = req.params
    const result = await model.deleteDataBooking({id_booking})
    return res.status(200).json(result)

  }catch(error){
    return res.send(error)
  }
}

module.exports = ctrl