const ctrl = {}
const model = require('../models/movie')
const {respons} = require('../util/respons')

ctrl.insertDataMovie = async (req, res) =>{
  try{


    if(req.file !== undefined){
      console.log(req.file.filename)
      req.body = {
        ...req.body,
        url_image_movie: req.file.filename
      }
    }else{
      return respons(res, 400, "jpg, jpeg, or png only")
    }
    
    const {title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie} = req.body
    const result = await model.addDataMovie({title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie})
    
    return respons(res, 201, result)

  }catch(e){
    return respons(res, 500, e.message)
  }
}

  
ctrl.getDataMovie = async (req, res) =>{
  try{
    const {page, limit, id_movie} = req.query
   
    const params = {
      page : page || 1,
      limit : limit || 3,
      id_movie : id_movie
    }
    console.log(params)
    const result = await model.readDataMovie(params)
    return respons(res, 200, result)

  }catch(e){
    return respons(res, 500, e.message)
  }
}

ctrl.changaDataMovie = async (req, res)=>{
  try{

    const {id_movie} = req.params
   
    if(req.file != undefined){
      req.body.url_image_movie = req.file.filename
    }

    console.log('masuk changedatamovie')
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
    
      console.log(result)
    return respons(res, 200, result)
  }catch(e){
    return respons(res, 500, e.message)
  }
}

ctrl.removeDataMovie = async (req, res) =>{
  try{
    

    const {id_movie} = req.params

    const result = await model.deleteDataMovie({id_movie})
    return respons(res, 200, result)
  }catch(e){
    return respons(res, 500, e.message)
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
    return respons(res, 200, result)
  } catch (error) {
    return respons(res, 500, error.message)
  }
}

module.exports = ctrl