const bcrypt = require('bcryptjs')
const router = require('express').Router()
const { User } = require('../db/models')
const {signinRender, signupRender} = require('../controllers/signController')

router.get('/signin', signinRender)

router.get('/signup', signupRender)



router.post('/signup', )

router.post('/signin', (req, res, next) => {
    const { login, password } = req.body
    if (login && password) {
        const curUser = await User.findOne({ where: { login } })
        if (curUser === null) {
            res.render('sign', { sign: true, error: "Пользователь не найден" })
        } else {
            if (await bcrypt.compare(password, curUser.password)) {
                req.session.user = { id: curUser.id, login: curUser.login, status: curUser.status }
            } else {
                res.render('sign', { sign: true, error: 'Пароль неверный' })
            }
        }
    }
})


module.exports = router
