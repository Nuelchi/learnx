const express = require('express');
const router = express.Router();

const {addCourse, getCourse, getCourses, updateCourse} = require('../controllers/course-controller');
const protection = require('../authorization');
const authMiddleware = require("../Authservice.js/auth-middleware.js");

router.post('/', protection.restriction('admin'),addCourse);
router.put('/:id', protection.restriction('admin'),updateCourse);
router.get('/', authMiddleware.subAuth,getCourse);
router.get('/', authMiddleware.subAuth, getCourses);



module.exports = router;