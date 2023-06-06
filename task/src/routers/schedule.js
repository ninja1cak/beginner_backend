const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/schedule')
const cors = require('cors')

const corsOption = {
  credentials: true,
  origin: '*'
}

route.get('/show', cors(corsOption), ctrl.getDataSchedule)
route.post('/insert', ctrl.insertDataSchedule)
route.delete('/delete/:id_schedule', ctrl.removeDataSchedule)
route.put('/update/:id_schedule', ctrl.changeDataSchedule)
module.exports = route