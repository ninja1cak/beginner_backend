const ctrl = {}
const model = require('../models/movie')

ctrl.insertDataMovie = async (req, res) =>{
  try{

    if(req.body.url_image_movie === undefined){
      console.log(req.file.filename)
      req.body.url_image_movie = req.file.filename
    }

    const {title_movie, director_movie, casts_movie, release_date_movie, url_image_movie} = req.body
    const result = await model.addDataMovie({title_movie, director_movie, casts_movie, release_date_movie, url_image_movie})
    
    return res.status(200).json(result)

  }catch(e){
    return res.send(e)
  }
}

  
ctrl.getDataMovie = async (req, res) =>{
  try{
    const result = await model.readDataMovie()
    return res.status(200).json(result)

  }catch(e){
    return res.send(e)
  }
}

ctrl.changaDataMovie = async (req, res)=>{
  try{
    const {id_movie} = req.params
    const {synopsis_movie, url_image_movie} = req.body
    const result = await model.updateDataMovie({synopsis_movie, url_image_movie, id_movie})
    return res.status(200).json(result)
  }catch(e){
    return res.send(e)
  }
}

ctrl.removeDataMovie = async (req, res) =>{
  try{
    
    const {id_movie} = req.params
    const result = await model.deleteDataMovie({id_movie})
    return res.status(200).json(result)
  }catch(e){
    return res.send(e)
  }
}

module.exports = ctrl