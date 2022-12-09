////const productModel = require('../models/product.model');
const dbConn = require("../config/db.config");
const Order = require("../models/order.model");

//get all Orders
exports.getAllOrder = (req, res) => {
  console.log("get all orders");
  dbConn.query("SELECT * FROM tb_order", (err, rows, fields) => {
    if (err) res.json({ message: "failed to get product list", error: err });
    else {
      console.log(rows);
      res.json({ message: "success", rows });
    }
  });
  //res.send('Orders...');
};

//get a order
exports.getOrderById = (req, res) => {
  console.log("get a order...");

  const id = req.params.id;
  dbConn.query("SELECT * FROM tb_order WHERE order_id=?", id, (err, result) => {
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

//get a order only from tb_order
exports.getOrderBySupplierId = (req, res) => {
  console.log("get a order...");

  const id = req.params.id;
  dbConn.query(
    "SELECT * FROM tb_order WHERE supplier_id=?",
    id,
    (err, result) => {
      if (err)
        res.json({
          supplier_id: id,
          message: "failed to get the order",
          error: err,
        });
      else {
        console.log(result);
        res.json({ message: "success", result });
      }
    }
  );
};

//get a order only from tb_order and tb_order_details
exports.getOrderBySupplierIdFrom_tb_order_and_tb_order_details = (req, res) => {
  console.log("get a order only from tb_order and tb_order_details...");

  const id = req.params.id;
  dbConn.query(
    "SELECT tb_order_details.product_name FROM tb_order natural join tb_order_details WHERE order_id= ? ",
    [id],
    (err, result) => {
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
    }
  );
};

//add a new order
exports.addOrder = (req, res) => {
  console.log("insert a order");
  var newEmployee = req.body;
  console.log(newEmployee);

  var input = Object.values(newEmployee);

  var query = "insert into tb_order values (?)";

  dbConn.query(query, [input], (err, rows, Field) => {
    if (!err) {
      res.status(400).json({
        message: "order insert successful",
        rows,
        newEmployee,
      });
    } else {
      res.status(400).json({
        message: "order insert failed",
        err,
      });
    }
  });

};


///order update
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  console.log("update a order");
  // const {
  //   total_cost,
  //   payment_status,
  //   ///order_date,
  //   supplier_id
  // } = new Order(req.body);


  const orderData = new Order(req.body);
  //var input=Object.values(orderData);
  ///var query ="UPDATE tb_order SET total_cost=?, payment_status=?, order_date=?, supplier_id=? WHERE order_id=?"
  console.log(orderData);
  dbConn.query(
    "UPDATE tb_order SET total_cost=?, payment_status=?,order_date=?, supplier_id=? WHERE order_id=?",
    [
    orderData.total_cost,
    orderData.payment_status,
    orderData.order_date,
    orderData.supplier_id,
    id
    ],
    (err, result) => {
      if (err) {
        res.json({ message: "failed to update order", err });
      } else {
        console.log(result);
        res.json({ message: "successfully updated" });
      }
    }
  );
};






//order update
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  console.log("update a order");
  // const {
  //   total_cost,
  //   payment_status,
  //   ///order_date,
  //   supplier_id
  // } = new Order(req.body);


  const orderData = new Order(req.body);
  //var input=Object.values(orderData);
  ///var query ="UPDATE tb_order SET total_cost=?, payment_status=?, order_date=?, supplier_id=? WHERE order_id=?"
  console.log(orderData);
  dbConn.query(
    "UPDATE tb_order SET payment_status=? WHERE order_id=?",
    [
    // orderData.total_cost,
    orderData.payment_status,
    // orderData.order_date,
    // orderData.supplier_id,
    id
    ],
    (err, result) => {
      if (err) {
        res.json({ message: "failed to update order", err });
      } else {
        console.log(result);
        res.json({ message: "successfully updated" });
      }
    }
  );
};




