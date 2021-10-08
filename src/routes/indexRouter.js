const router = require('express').Router();
const { Customer, Order } = require('../db/models')

router.get('/', async (req, res, next) => {
    const customersList = await Customer.findAll({ raw: true })
    const orderList = await Order.findAll({ raw: true })
    console.log(orderList);
    res.render('index', { customersList, orderList })
})

router.route('/logout')
    .get((req, res) => {
        req.session.destroy();
        res.clearCookie('sid').redirect('/')
    });


module.exports = router



router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;
