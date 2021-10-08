const bcrypt = require('bcryptjs')
const router = require('express').Router()
const { User } = require('../db/models')
const { signinRender, signupRender, regNewUser, signInUser } = require('../controllers/signController')



router.get('/signin', signinRender)

router.get('/signup', signupRender)

router.post('/signup', regNewUser)



router.post('/signin', signInUser)


module.exports = router;
