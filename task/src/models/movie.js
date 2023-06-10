const model = {}
const database = require('../config/database')



model.addDataMovie = async ({title_movie, genre, director_movie, casts_movie, release_date_movie, url_image_movie}) =>{
  try {
    await database.query('BEGIN')

    const movie = await database.query(`INSERT INTO public.movie(
      title_movie,
      director_movie,
      casts_movie, 
      release_date_movie,
      url_image_movie
      ) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie`,[
        title_movie,
        director_movie,
        casts_movie, 
        release_date_movie,
        url_image_movie
      ])
    console.log(movie.rows[0].id_movie)
    
    await database.query('COMMIT')

    if(genre && genre.length > 0){
      genre.map( async (element) => {
        return await database.query(`INSERT INTO
          public.bridge_movie_genre(id_movie, id_genre)
          VALUES ($1, $2)  
        `,[
          movie.rows[0].id_movie,
          element
        ])
      })
    }


    return 'data movie created'
    
  } catch (error) {
    await database.query('ROLLBACK')
    return error
  }
}

model.readDataMovie = async ({page, limit}) =>{
  try {
   
    const offset =  (page-1) * limit

    const totalData = await database.query(
      `SELECT COUNT(id_movie) count FROM public.movie`
    )
    const count = totalData.rows[0].count
    console.log(totalData.rows[0].count)
    const meta = {
      next : count == 0 ? null : page == Math.ceil(count/limit) ? null : Number(page) + 1,
      prev : page == 1 ? null : Number(page) - 1,
      total: count
    }

    const data  = await database.query(
      `
      SELECT  
        title_movie,
        json_agg(
          JSONB_BUILD_OBJECT(
            'id', g.id_genre,
            'value', g.name_genre
          )
        ) genre,
        release_date_movie,
        director_movie,
        casts_movie,
        synopsis_movie
      FROM public.movie m JOIN public.bridge_movie_genre pbmg
      ON m.id_movie = pbmg.id_movie JOIN public.genre g
      ON g.id_genre = pbmg.id_genre GROUP BY m.id_movie
      LIMIT $1 OFFSET $2
      `,[
        limit, offset
      ]
    )
   
    return {
      meta: meta,
      data: data.rows
    }
    
  } catch (error) {
   
  }
}

model.updateDataMovie = async ({
  title_movie, 
  genre, 
  director_movie, 
  casts_movie, 
  release_date_movie, 
  url_image_movie, 
  id_movie, 
  synopsis_movie,
  duration_movie}) => { 
    try {
      await database.query('BEGIN')
      
      const update = await database.query(`UPDATE public.movie
      SET
        title_movie = COALESCE(NULLIF($1, ''), title_movie),
        director_movie = COALESCE(NULLIF($2, ''), director_movie),
        release_date_movie = $3,
        url_image_movie =  COALESCE(NULLIF($4,''), url_image_movie),
        synopsis_movie = COALESCE(NULLIF($5,''), synopsis_movie),
        duration_movie = COALESCE(NULLIF($6,''), duration_movie)
      WHERE 
        id_movie = $7      
      `,[
        title_movie, 
        director_movie, 
        release_date_movie, 
        url_image_movie, 
        synopsis_movie,
        duration_movie,
        id_movie
      ])
      await database.query("COMMIT")    
     
      if(genre.length > 0){

      const getDataMovieGenre = await database.query(`SELECT id_bridge_movie_genre 
      FROM public.bridge_movie_genre WHERE id_movie = $1`,[id_movie])
  
      genre.map(async(element, index) => {      
      
        return await database.query(`UPDATE public.bridge_movie_genre
          SET 
            id_genre = $1
          WHERE
            id_bridge_movie_genre = $2
        `,[
          element,
          getDataMovieGenre.rows[index].id_bridge_movie_genre
        ])
      })
    }


      return `${update.rowCount} update berhasil`
    } catch (error) {
      await database.query("ROLLBACK")
      return "update gagal"
    }
  }


model.deleteDataMovie = ({id_movie}) =>{
  return new Promise((resolve, reject) =>{
   
    database.query(`DELETE FROM public.movie WHERE id_movie = $1`,[id_movie])
    .then((result) =>{
      resolve("data movie succesfully deleted")
    })
    .catch((e)=>{
      console.log(e)
      reject("failed to delete data movie")
    })
  })
}

model.readDataMovieBy = async ({page, limit, orderBy, search}) =>{
  try {
    search[0] += '%'
    
    // console.log({page, limit, orderBy, search})
  
    
    const offset = (page - 1) * limit

    const totalData = await database.query(`SELECT COUNT(distinct m.id_movie) count FROM public.movie m
    JOIN public.bridge_movie_genre bmg  on 
    bmg.id_movie  =  m.id_movie  
    JOIN genre g on g.id_genre = bmg.id_genre 
    WHERE title_movie ILIKE $1
    AND date_part('year', release_date_movie) = $2
    AND name_genre  ilike $3`,[
      search[0],
      search[1],
      search[2]
    ])

    const count = totalData.rows[0].count



    const meta = {
      next : count <= 0 ? null : page == Math.ceil(count/limit) ? null : Number(page) +1,
      prev: page == 1 ? null : Number(page) - 1,
      total: count
    }   
 
    const data = await database.query(`
    SELECT
      title_movie,
      json_agg(
        JSONB_BUILD_OBJECT(
          'id', g.id_genre,
          'genre', g.name_genre)
      ),
      director_movie,
      casts_movie,
      synopsis_movie
    FROM public.movie m 
    JOIN public.bridge_movie_genre bmg 
    ON m.id_movie = bmg.id_movie 
    JOIN public.genre g
    ON g.id_genre = bmg.id_genre
    WHERE title_movie ILIKE $1 
    AND date_part('year', release_date_movie) = $2
    AND name_genre ILIKE $3
    GROUP BY m.id_movie 
    ORDER BY $4 ASC
    LIMIT $5 OFFSET $6;
    `,
    [
      search[0],
      search[1],
      search[2],
      orderBy,
      limit,
      offset
    ])

    return {
      meta : meta,
      data : data
    }
    
  } catch (error) {
    
  }
}

module.exports = model