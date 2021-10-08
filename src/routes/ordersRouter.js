const orderRouter = require('express').Router();
const { Order, Comment } = require('../db/models');

orderRouter.route('/')
  .get(async (req, res) => {
    const orderData = await Order.findAll({
      include: [{
        model: Comment,
      }],
      order: [
        ['id', 'ASC'],
      ],
    });
    res.render('order', { orderData });
  });

orderRouter.route('/:id')
  .get(async (req, res) => {
    const orderData = await Order.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
    });
    res.render('orderdetails', { orderData });
  });

orderRouter.route('/:commId')
  .delete(async (req, res) => {
    await Comment.destroy({
      where: {
        id: req.params.commId,
      },
    });
    res.sendStatus(200);
  });

orderRouter.route('/:commId/edit')
  .get(async (req, res) => {
    const commData = await Comment.findOne({
      where: {
        id: req.params.commId,
      },
    });
    res.render('commedit', { commData });
  })

  .patch(async (req, res) => {
    const { title, content } = req.body;
    await Comment.update(
      { title, content }, {
        where: { id: req.params.commId },
      },
    );
    res.sendStatus(200);
  });

module.exports = orderRouter;
