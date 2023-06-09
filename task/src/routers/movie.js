const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/movie')
const authCheck = require('../middleware/authCheck')
const upload = require('../middleware/upload')

route.get('/show', [authCheck.check, authCheck.isAdminOrUser], ctrl.getDataMovie)
route.post('/insert', [authCheck.check, authCheck.isAdmin], upload.single('image'),ctrl.insertDataMovie)
route.put('/update/:id_movie', [authCheck.check, authCheck.isAdmin],ctrl.changaDataMovie)
route.delete('/delete/:id_movie', [authCheck.check, authCheck.isAdmin], ctrl.removeDataMovie)


module.exports = route