const router = require("express").Router();
const orderController = require("../controllers/order.controller");

//get all order
router.get("/orders", orderController.getAllOrder);

//get order by id
router.get("/:id", orderController.getOrderById);

// //get order by supplier_id
router.get("/orders/supplierID/:id", orderController.getOrderBySupplierId);

// //get all product from tb_order and tb_order_details
router.get("/orders/orderID/:id", orderController.getOrderBySupplierIdFrom_tb_order_and_tb_order_details);


// //add order
router.post("/add-order", orderController.addOrder);


module.exports = router;
