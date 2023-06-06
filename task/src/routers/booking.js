const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/booking')

route.get('/show', ctrl.getDataBooking)
route.delete('/delete/:id_booking', ctrl.removeDataBooking)
route.post('/insert', ctrl.insertDataBooking)
route.put('/update/:id_booking', ctrl.changeDataBooking)
module.exports = route