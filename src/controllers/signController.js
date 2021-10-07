function signinRender(req, res, next) {
    res.render('sign', { sign: false })
}

function signupRender(req, res, next) {
    res.render('sign', { sign: true })
}

async function regNewUser (req, res, next) {
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
}


module.exports = { signinRender, signupRender }
