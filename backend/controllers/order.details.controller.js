////const productModel = require('../models/product.model');
const dbConn = require("../config/db.config");
const Order = require("../models/order.details.model");

//get all Orders
exports.getAllOrderDetails = (req, res) => {
  console.log("get all orderDetails");
  dbConn.query("SELECT * FROM tb_order_details", (err, rows, fields) => {
    if (err) res.json({ message: "failed to get product list", error: err });
    else {
      console.log(rows);
      res.json({ message: "success", rows });
    }
  });
  //res.send('Orders...');
};

//get a order
exports.getOrderDetailsById = (req, res) => {
  console.log("get a order...");

  const id = req.params.id;
  dbConn.query("SELECT * FROM tb_order_details WHERE product_id=?", id, (err, result) => {
    if (err)
      res.json({
        order_id: id,
        message: "failed to get the order",
        error: err,
      });
    else {
      console.log(result);
      res.json({ message: "success", result });
    }
  });
};



// //get a order only from tb_order and tb_order_details
// exports.getOrderDetailsBySupplierIdFrom_tb_order_and_tb_order_details = (req, res) => {
//   console.log("get a order only from tb_order and tb_order_details...");

//   const id = req.params.id;
//   dbConn.query(
//     "SELECT tb_order_details.product_name FROM tb_order natural join tb_order_details WHERE order_id= ? ",
//     [id],
//     (err, result) => {
//       if (err)
//         res.json({
//           order_id: id,
//           message: "failed to get the order",
//           error: err,
//         });
//       else {
//         console.log(result);
//         res.json({ message: "success", result });
//       }
//     }
//   );
// };

//add a new order
exports.addOrdersDetails = (req, res) => {
  console.log("insert a order details");
  var newEmployee = req.body;
  console.log(newEmployee);

  var input = Object.values(newEmployee);

  var query = "insert into tb_order_details values (?)";

  dbConn.query(query, [input], (err, rows, Field) => {
    if (!err) {
      res.status(400).json({
        message: "orders details insert successful",
        rows,
        newEmployee,
      });
    } else {
      res.status(400).json({
        message: "orders details insert failed",
        err,
      });
    }
  });

};

