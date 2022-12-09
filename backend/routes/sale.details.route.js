const router = require("express").Router();
const saleController = require("../controllers/sale.details.controller");

//get all sale
router.get("/", saleController.getAllSaleDetails);

//get sale by invoice_id
router.get("/details/:id", saleController.getSaleDetailsById);

// //get sale by date
router.get("/show-sale-details/:date", saleController.getSaleDetailsBydate);

// //add sale details
router.post("/", saleController.addSaleDetails);


///router.put("/:id", saleController.updateSale);


module.exports = router;
