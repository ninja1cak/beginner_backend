const ctrl = {}
const model = require('../models/movie')

ctrl.insertDataMovie = async (req, res) =>{
  try{


    if(req.body.url_image_movie === undefined){
      console.log(req.file.filename)
      req.body = {
        ...req.body,
        url_image_movie: req.file.filename
      }
    }
    
    const {title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie} = req.body
    const result = await model.addDataMovie({title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie})
    
    return res.status(200).json(result)

  }catch(e){
    return res.send(e)
  }
}

  
ctrl.getDataMovie = async (req, res) =>{
  try{
    const {page, limit} = req.query
   
    const params = {
      page : page || 1,
      limit : limit || 3
    }
    console.log(params)
    const result = await model.readDataMovie(params)
    return res.status(200).json(result)

  }catch(e){
    return res.send(e)
  }
}

ctrl.changaDataMovie = async (req, res)=>{
  try{
    const {id_movie} = req.params
    const {title_movie, 
      genre, 
      director_movie, 
      casts_movie, 
      release_date_movie, 
      url_image_movie, 
      synopsis_movie,
      duration_movie} = req.body

    const result = await model.updateDataMovie({  
      title_movie, 
      genre, 
      director_movie, 
      casts_movie, 
      release_date_movie, 
      url_image_movie, 
      id_movie, 
      synopsis_movie,
      duration_movie})
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

ctrl.getDataMovieBy = async (req, res) =>{
  try {
    const params = {
      page : req.query.page || 1,
      limit : req.query.limit || 3,
      orderBy : req.query.orderBy ||'title_movie',
      search : req.query.search
    }
    console.log(params)
    const result = await model.readDataMovieBy(params)
    return res.send(result)
  } catch (error) {
    return res.send(error)
  }
}

module.exports = ctrl