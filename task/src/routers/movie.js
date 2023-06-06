const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/movie')

route.get('/show', ctrl.getDataMovie)
route.delete('/delete/:id_movie', ctrl.removeDataMovie)
route.post('/insert', ctrl.insertDataMovie)
route.put('/update/:id_movie', ctrl.changaDataMovie)
module.exports = route