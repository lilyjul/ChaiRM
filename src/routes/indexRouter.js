const router = require('express').Router();
const { Customer } = require('../db/models')

router.get('/', async (req, res, next) => {
    const customersList = await Customer.findAll({raw:true})
    res.render('index', { customersList })
})

router.route('/logout')
    .get((req, res) => {
        req.session.destroy();
        res.clearCookie('sid').redirect('/')
    });


module.exports = router




