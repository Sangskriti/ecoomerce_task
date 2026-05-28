const router = require('express').Router();

const {
  saveOrder,
  getOrders
} = require('../controllers/orderController');

router.post('/', saveOrder);
router.get('/', getOrders);

module.exports = router;