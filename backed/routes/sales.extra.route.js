const router = require('express').Router();
const salesController = require('../controllers/sales.extra.controller');

//router.get('/show-sales-details/:id', salesController.getSalesDetailById);
router.get('/show-sales-details/date/', salesController.getx);
router.get('/show-sales-details/all-by-date/:date', salesController.getTotalSaleByDate);
//router.get('/show-sales-details/all-by-id/:id', salesController.getTotalSaleById);

//calculate revenue
router.get('/report/revenue/', salesController.getRevenue);

//get cost of goods sold
router.get('/report/cost-of-good-sold', salesController.getCostOfGoodsSold);

module.exports = router;