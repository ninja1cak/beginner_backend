const ctrl = {}
const model = require('../models/movies')

ctrl.getData = async (req,res) =>{
  try{
    const result = await model.getDataMovie()
    return res.send(result)
  }catch(error){
    console.log("ERROR")
  }
}

ctrl.readDataQuery = async (req, res) =>{
  try{
    const result = await model.getDataQuery()
    return res.send(result)
  }catch(error){
    return res.send("pembacaan gagal")
  }
}

ctrl.saveDataMovie = async (req,res) =>{
  try{
    const {title_movie, director_movie} = req.body
    const result = await model.addDataMovie({title_movie, director_movie})
    return res.send(result)
  }catch(error){
    console.log("ERROR")
    return res.send("ERRORRR")
  }
}

ctrl.changaDataMovie = async (req,res) =>{
  try{
    const {casts_movie, id_movie} = req.body
    const result = await model.updateDataMovie({casts_movie, id_movie})
    return res.send(result)
  }catch(error){
    console.log(error)
  }
}


// ctrl.saveDataMovie = async (req, res) => {
//   try {
//       const { title_movie, director_movie } = req.body
//       const result = await model.addDataMovie({ title_movie, director_movie })
//       return res.status(200).json(result)
//   } catch (error) {
//       console.log(error)
//   }
// }


module.exports = ctrl