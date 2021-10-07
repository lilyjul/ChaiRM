const router = require('express').Router()
const { Customer } = require('../db/models')
const adminCheck = require('../middlewares/adminCheck')

router.get('/', async (req, res, next) => {
    const customersList = await Customer.findAll({raw:true});
    console.log(customersList);
    res.render('clients',  {customersList} )
})

router.route('/:id')
    .get(async (req, res, next) => {
        const curCustomer = await Customer.findOne({ where: { id: req.params.id } });
        res.render('clients', { curCustomer })
    })
    .delete(adminCheck, async (req, res) => {
        await Customer.destroy({ where: { id: req.params.id } });
        res.redirect('/')
    })


module.exports = router



