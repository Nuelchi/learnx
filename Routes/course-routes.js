const express = require('express');
const router = express.Router();

const {addCourse, getCourse, getCourses, updateCourse} = require('../controllers/course-controller');
const protection = require('../authorization')

router.post('/', protection.restriction('admin'),addCourse);
router.put('/:id', protection.restriction('admin'),updateCourse);
router.get('/', getCourse);
router.get('/', getCourses);



module.exports = router;