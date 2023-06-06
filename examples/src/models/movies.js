const model = {}
const db = require('../config/db')

model.getDataMovie = () =>{
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM public.movie`)
    .then((result) => {
      resolve(result.rows)
    })
    .catch((error) =>{
      reject(error)
    })
  })
}

model.getDataQuery = () =>{
  return new Promise ((resolve, reject) =>{
    db.query(`SELECT title_movie FROM public.movie`)
    .then((result) =>{
      resolve(result.rows)
    })
    .catch((error) =>{
      reject(error)
    })
  })
}

model.addDataMovie = ({title_movie, director_movie}) =>{
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO public.movie (title_movie, director_movie) VALUES ($1, $2)`,[title_movie, director_movie])
    .then((result) => {
      resolve("berhasil")
    })
    .catch((error) =>{
      reject(error)
    })
  })
}


model.updateDataMovie = ({casts_movie, id_movie}) =>{
  return new Promise((resolve, reject) =>{
    db.query(`UPDATE public.movie SET casts_movie = ARRAY[$1] WHERE id_movie = $2`, [casts_movie, id_movie])
    .then((result) =>{
      resolve("Berhasil di update")
    })
    .catch((error) =>{
      reject("update database gagal")
    })
  })
}



module.exports = model