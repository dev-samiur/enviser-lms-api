const express= require('express')
const router= express.Router()
const EnrollController= require('../controllers/EnrollController')
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', EnrollController.getAll)
router.get('/:id', EnrollController.getById)
router.post('/', AuthMiddleware, EnrollController.create)

module.exports= router    