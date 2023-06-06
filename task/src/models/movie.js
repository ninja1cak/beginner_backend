const model = {}
const database = require('../config/database')



model.addDataMovie = ({title_movie, director_movie, casts_movie, release_date_movie}) =>{
  return new Promise ((resolve, reject) =>{
    database.query(`INSERT INTO public.movie(
      title_movie,
      director_movie,
      casts_movie, 
      release_date_movie
      ) VALUES ($1, $2, $3, $4)`,[
        title_movie,
        director_movie,
        casts_movie, 
        release_date_movie
      ])
      .then((result) =>{
        resolve("data movie succesfully added")
      })
      .catch((e) =>{
        reject("failed to add data movie")
      })
  })
}

model.readDataMovie = () =>{
  return new Promise((resolve, reject) =>{
    database.query('SELECT * FROM public.movie')
    .then((result)=>{
      resolve(result.rows)
    }).catch((e)=>{
      reject("failed to read data movie")
    })
  })
}


model.updateDataMovie = ({synopsis_movie, url_image_movie, id_movie}) =>{
  return new Promise((resolve, reject) =>{
    database.query(`UPDATE public.movie 
      SET synopsis_movie = $1,
      url_image_movie = $2
      WHERE id_movie = $3`,[synopsis_movie, url_image_movie, id_movie])  
      .then((result) =>{
        resolve("data movie succesfully updated")
      })
      .catch((e)=>{

        reject("failed to update data movie")
      })
  })
}

model.deleteDataMovie = ({id_movie}) =>{
  return new Promise((resolve, reject) =>{
    database.query(`DELETE FROM public.movie WHERE id_movie = $1`,[id_movie])
    .then((result) =>{
      resolve("data movie succesfully deleted")
    })
    .catch((e)=>{
      reject("failed to delete data movie")
    })
  })
}

module.exports = model