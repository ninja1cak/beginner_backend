const ctrl = {}
const model = require('../models/genre')

ctrl.insertDataGenre = async (req, res) =>{
  try {
    const {name_genre} = req.body
    const result = await model.addDataGenre({name_genre})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.getDataGenre = async (req, res) => {
  try{
    const result = await model.readDataGenre();
    return res.status(200).json(result)

  }catch(error){
    return res.send(error)
  }
}

ctrl.changeDataGenre = async (req, res) => {
  try {
    const {id_genre} = req.params
    const {name_genre} = req.body
    const result = await model.updateDataGenre({name_genre, id_genre})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}

ctrl.removeDataGenre = async (req, res) =>{
  try {
    const {id_genre} = req.params
    const result = await model.deleteDataGenre({id_genre})
    return res.status(200).json(result)
  } catch (error) {
    return res.send(error)
  }
}




module.exports = ctrl