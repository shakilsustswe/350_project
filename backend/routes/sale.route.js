const router = require("express").Router();
const saleController = require("../controllers/sale.controller");

//get all sale
router.get("/sales", saleController.getAllSale);

//get sale by invoice_id
router.get("/:id", saleController.getSaleById);

// //get sale by date
router.get("/show-sale/:date", saleController.getSaleBydate);

// //add order
router.post("/add-sale", saleController.addSale);


router.put("/:id", saleController.updateSale);


//current sales of the month
router.get("/report/current-month-sales", saleController.getCurrentMonthSale);


//total sales of current month(amount)
router.get("/report/total-sales-of-the-month", saleController.getTotalSalesOfTheCurrentMonth);


module.exports = router;
