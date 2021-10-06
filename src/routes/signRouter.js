const bcrypt = require('bcryptjs')
const router = require('express').Router()
const { User } = require('../db/models')

router.get('/signin', (req, res, next) => {
    res.render('sign', { sign: false })
})

router.get('/signup', (req, res, next) => {
    res.render('sign', { sign: true })
})

router.post('/signup', async (req, res, next) => {
    const { login, password: pass, email, status } = req.body
    if (login && pass && email && status) {
        try {
            const saltRounds = 10;
            const password = await bcrypt.hash(pass, saltRounds)
            const curUser = await User.create({ login, password, email, status })
            req.session.user = { id: curUser.id, login: curUser.login, status: curUser.status }
        } catch (error) {
            res.render('sign', { sign: false, error: 'Вы уже зарегистрированны в системе используйте Ваши логин и пароль' })
        }
    } else {
        res.render('sign', { sign: true, error: 'Вы заполнили не все поля' })
    }
})

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
