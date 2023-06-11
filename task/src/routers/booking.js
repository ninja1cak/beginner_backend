const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/booking')
const checkAuth = require('../middleware/authCheck')
const authCheck = require('../middleware/authCheck')

route.get('/show', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDataBooking)
route.delete('/delete/:id_booking', [authCheck.check, authCheck.isAdmin], ctrl.removeDataBooking)
route.post('/insert', [authCheck.check, authCheck.isAdminOrUser], ctrl.insertDataBooking)
route.put('/update/:id_booking', [authCheck.check, authCheck.isAdmin], ctrl.changeDataBooking)
module.exports = route