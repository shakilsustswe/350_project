const router = require('express').Router();
const orderController = require('../controllers/order.extra.controller');

//calculate total purchase
router.get('/total-purchase/', orderController.getTotalPurchase);


module.exports = router;