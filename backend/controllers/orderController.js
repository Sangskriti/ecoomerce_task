const Order = require('../models/Order');

exports.saveOrder = async (req, res) => {

  try {

    const order = await Order.create(req.body);

    res.json(order);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find();

    res.json(orders);

  } catch (err) {
    res.status(500).json(err);
  }
};