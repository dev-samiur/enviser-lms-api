const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const upload = require('../middlewares/FileUploadMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.get('/owner/:id', AuthMiddleware, CourseController.getByOwner);
router.post('/', [AuthMiddleware, upload.any()], CourseController.create);
router.delete('/:id', AuthMiddleware, CourseController.remove);

module.exports = router;
