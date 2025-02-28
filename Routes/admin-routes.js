const express = require('express');
const router = express.router();

const { createAdmin, loginAdmin, getAllUsers} = require('../controllers/admin-controller.js')
const protection = require('../authorization.js')


router.post('/signup', protection.restriction('admin'), createAdmin);
router.post('/login',protection.restriction('admin'), loginAdmin);
router.get('/allUser',protection.restriction('admin'),getAllUsers);



module.exports = router;