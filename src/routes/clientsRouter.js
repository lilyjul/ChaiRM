const router = require('express').Router()
const { Customer, User, Comment, CommentCustomer } = require('../db/models')
const adminCheck = require('../middlewares/adminCheck')





router.route('/')
    .get(async (req, res, next) => {
        const customersList = await Customer.findAll({ include: [{ model: Comment, }] })
        res.render('clients', { customersList });

    })



router.route('/:id')
    .get(async (req, res, next) => {
        const curCustomer = await Customer.findOne({ where: { id: req.params.id }, include: { model: Comment, } });
        let userId = curCustomer.Comments[0].dataValues.id
        const userName = await User.findOne({ where: { id: userId }, raw: true });
        res.render('clients', { curCustomer, userName })
        res.locals.customer = curCustomer.id
    })
    .post(async (req, res, next) => {
        const {content} = req.body
        const newComm = await Comment.create({ title: '1', content, userId: res.locals.user.id });
        
        const custId = req.params.id
        console.log(custId);
        await CommentCustomer.create({ commentId: newComm.id, customerId: custId })
        res.redirect(`/clients/${custId}`)
    })
    .delete(adminCheck, async (req, res) => {
        await Customer.destroy({ where: { id: req.params.id } });
        res.redirect('/')
    })


module.exports = router



module.exports = router;
