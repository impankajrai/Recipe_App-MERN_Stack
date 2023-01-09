const express = require('express')
const router = express.Router()
const { recipes, recipeDetails } = require('../controller/recipesController')
const { userAuth } = require('../middlewares/userAuth')


router.route('/').get(userAuth,recipes)
router.route('/details/:id').get(recipeDetails)



module.exports = router