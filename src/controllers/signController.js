const bcrypt = require('bcryptjs')
const { User } = require('../db/models')

function signinRender(req, res, next) {
    res.render('login', { sign: false })
}

function signupRender(req, res, next) {
    res.render('registration', { sign: true })
}

async function regNewUser(req, res, next) {
    const { firstName, lastName, email, password: pass, position } = req.body
    if (firstName && lastName && email && pass, position) {
        const saltRounds = 10;
        const password = await bcrypt.hash(pass, saltRounds)
        const curUser = await User.create({ firstName, lastName, email, password, position })
        req.session.user = { id: curUser.id, name: curUser.firstName, position: curUser.position }
        res.redirect('/')
    } else {
        res.render('registration', { error: 'Вы заполнили не все поля' })
    }
    
}


async function signInUser(req, res, next){
    const { email, password } = req.body
    if (email && password) {
        const curUser = await User.findOne({ where: { email } })
        if (curUser === null) {
            res.render('login', {error: "Пользователь не найден" })
        } else {
            if (await bcrypt.compare(password, curUser.password)) {
                req.session.user = { id: curUser.id, name: curUser.firstName, status: curUser.status }
                res.redirect('/')
            } else {
                res.render('login', { sign: true, error: 'Пароль неверный' })
            }
        }
    }
}


module.exports = { signinRender, signupRender, regNewUser, signInUser}
