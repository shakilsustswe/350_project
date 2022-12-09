const router = require("express").Router();
const orderController = require("../controllers/order.details.controller");

//get all order
router.get("/", orderController.getAllOrderDetails);

//get order by id
router.get("/:id", orderController.getOrderDetailsById);


// //add ordersdetails
router.post("/add-orderDetails", orderController.addOrdersDetails);

module.exports = router;
