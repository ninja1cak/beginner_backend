const ctrl = {}
const model = require('../models/schedule')

ctrl.insertDataSchedule = async (req, res) =>{
  try {
    const {id_movie, date_start, date_end, cinema_name, cinema_address, time_playing, price_seat, cinema_logo_url} = req.body
    const result = await model.addDataSchedule({id_movie, date_start, date_end, cinema_name, cinema_address, time_playing, price_seat, cinema_logo_url})
    return res.status(200).json(result)

  } catch (error) {
    return res.send(error)
  }
}

ctrl.getDataSchedule = async (req, res) => {
  try{
    const result = await model.readDataSchedule()
    return res.status(200).json(result)
  }catch(error){
    return res.send(error)
  }
}

ctrl.changeDataSchedule = async (req,res) =>{
  try {
    const {id_schedule} = req.params
    const {price_seat} = req.body
    const result = await model.updateDataMovie({price_seat, id_schedule})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.removeDataSchedule = async (req, res) =>{
  try{
    const {id_schedule} = req.params
    const result = await model.deleteDataMovie({id_schedule})
    return res.status(200).json(result)
  }catch(error){
    return res.send(error)
  }
}






module.exports = ctrl