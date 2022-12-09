////const productModel = require('../models/product.model');
const dbConn = require("../config/db.config");
const Sale = require("../models/sale.model");

//get all Sale Details
exports.getAllSaleDetails = (req, res) => {
  console.log("get all sale details");
  dbConn.query("SELECT * FROM tb_sale_details", (err, rows, fields) => {

    if (err) res.json({ message: "failed to get sale details list", error: err });
    else {
      console.log(rows);
      res.json({ message: "success", rows });
    }
  });
  
};

//get a sale
exports.getSaleDetailsById = (req, res) => {
  console.log("get a sale details...");

  const id = req.params.id;
  dbConn.query(
    "SELECT * FROM tb_sale_details WHERE invoice_id= ? ",
    id,
    (err, result) => {
      if (err)
        res.json({
          invoice_id: id,
          message: "failed to get the sale details",
          error: err,
        });
      else {
        console.log(result);
        res.json({ message: "success", result });
      }
    }
  );
};


//get a sale only from tb_sale_details
exports.getSaleDetailsBydate = (req, res) => {

  console.log("get sale details by date...");

  const id = req.params.date;
  console.log("date: " + id);
  dbConn.query(
    "SELECT * FROM tb_sale WHERE invoice_date= ? ",
    id,
    (err, result) => {
      if (err)
        res.json({
          invoice_date: id,
          message: "failed to get the sale details",
          error: err,
        });
      else {
        console.log(result);
        res.json({ message: "success", result });
      }
    }
  );
};

// //get a order only from tb_order and tb_order_details
// exports.getOrderBySupplierIdFrom_tb_order_and_tb_order_details = (req, res) => {
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

//add a new sale details
exports.addSaleDetails = (req, res) => {
  console.log("insert a sale details");
  // var data = req.body;
  // console.log(data);
  // var input = Object.values(data);

  // // const date = new Date();
  // // let day = date.getDate();
  // // let month = date.getMonth();
  // // let year = date.getFullYear();
  // // let format3 = year + "-" + month + "-" + day;

  var newEmployee = req.body;
  console.log(newEmployee);

  var input = Object.values(newEmployee);
  //console.log("t: " + );
  console.log("test: " + input);

  var query = "insert into tb_sale_details values (?)";
  ///var query = "insert into tb_sale_details (product_name, product_native_name, product_id, quantity, vat, discount, total_price, product_description, rate, invoice_id)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  dbConn.query(query, [input], (err, rows, Field) => {
    if (!err) {
      res.status(200).json({
        message: "sale details insert successful",
        rows,
        newEmployee,
      });
    } else {
      res.status(400).json({
        message: "sale details insert failed",
        err,
      });
    }
  });
};

//sale update
exports.updateSaleDetails = (req, res) => {
  const id = req.params.id;
  console.log("update a sale");
  // const {
  //   total_cost,
  //   payment_status,
  //   ///order_date,
  //   supplier_id
  // } = new Sale(req.body);

  const saleData = new Sale(req.body);
  //var input=Object.values(saledata);
  ///var query ="UPDATE tb_sale SET total_amount=?, payment_status=?, invoice_date=?, time=? WHERE invoice_id=?"
  console.log(saleData);
  dbConn.query(
    "UPDATE tb_sale SET total_amount=?, payment_status=?, invoice_date=?, time=? WHERE invoice_id=?",
    [
      ///saleData.invoice_id,
      saleData.total_amount,
      saleData.payment_status,
      saleData.invoice_date,
      saleData.time,
      id,
    ],
    (err, result) => {
      if (err) {
        res.json({ message: "failed to update sale", err });
      } else {
        console.log(result);
        res.json({ message: "successfully updated" });
      }
    }
  );
};


