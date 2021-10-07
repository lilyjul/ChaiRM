const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.render('index')
})

router.route('/logout')
    .get((req, res) => {
        req.session.destroy();
        res.clearCookie('sid').redirect('/')
    });


module.exports = router




