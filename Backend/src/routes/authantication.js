const express = require('express')
const router = express.Router()
const { login, logout, isAuthanticated } = require('../controller/authanticationController');
const { userAuth } = require('../middlewares/userAuth');

//user authantication route--------------------------------------
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/isauthanticated').get(userAuth,isAuthanticated);



module.exports = router