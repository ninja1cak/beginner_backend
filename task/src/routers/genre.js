const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/genre')
const cors = require('cors')

const corsOptions = {
  credential: true,
  origin : "*"
}

route.post('/insert', ctrl.insertDataGenre)
route.get('/show', cors(corsOptions), ctrl.getDataGenre)
route.put('/update/:id_genre', ctrl.changeDataGenre)
route.delete('/delete/:id_genre', ctrl.removeDataGenre)
module.exports = route
