////const productModel = require('../models/product.model');
const dbConn = require("../config/db.config");
const Sale = require("../models/sale.model");

//get all Sale
exports.getAllSale = (req, res) => {
  console.log("get all sales");
  dbConn.query("SELECT * FROM tb_sale", (err, rows, fields) => {
    if (err) res.json({ message: "failed to get product list", error: err });
    else {
      console.log(rows);
      res.json({ message: "success", rows });
    }
  });
  //res.send('Sales...');
};

//get a sale
exports.getSaleById = (req, res) => {
  console.log("get a sale...");

  const id = req.params.id;
  dbConn.query(
    "SELECT * FROM tb_sale WHERE invoice_id=?",
    id,
    (err, result) => {
      if (err)
        res.json({
          invoice_id: id,
          message: "failed to get the sale",
          error: err,
        });
      else {
        console.log(result);
        res.json({ message: "success", result });
      }
    }
  );
};

//get a sale only from tb_sale
exports.getSaleBydate = (req, res) => {

  console.log("get sale by date...");

  const id = req.params.date;
  console.log("date: " + id);
  dbConn.query(
    "SELECT * FROM tb_sale WHERE invoice_date=?",
    id,
    (err, result) => {
      if (err)
        res.json({
          invoice_date: id,
          message: "failed to get the sale",
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

//add a new sale
exports.addSale = (req, res) => {
  console.log("insert a sale");
  var data = req.body;
  console.log(data);
  var input = Object.values(data);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let format3 = year + "-" + month + "-" + day;
  let payment_status = "paid";
  var query = "insert into tb_sale (invoice_id, total_amount, payment_status, invoice_date, Time)values (?, ?, ?, ?)";

  dbConn.query(query, [input, payment_status, format3, date], (err, rows, Field) => {
    if (!err) {
      res.status(200).json({
        message: "sale insert successful",
        rows,
        data,
      });
    } else {
      res.status(400).json({
        message: "sale insert failed",
        err,
      });
    }
  });
};

//sale update
exports.updateSale = (req, res) => {
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

// //Sale update
// exports.updateSale = (req, res) => {
//   const id = req.params.id;
//   console.log("update a sale");
//   // const {
//   //   total_cost,
//   //   payment_status,
//   //   ///order_date,
//   //   supplier_id
//   // } = new Order(req.body);

//   const saleData = new Sale(req.body);
//   //var input=Object.values(orderData);
//   ///var query ="UPDATE tb_order SET total_cost=?, payment_status=?, order_date=?, supplier_id=? WHERE order_id=?"
//   console.log(saleData);
//   dbConn.query(
//     "UPDATE tb_order SET payment_status=? WHERE invoice_id=?",
//     [
//       // orderData.total_cost,
//       saleData.payment_status,
//       // orderData.order_date,
//       // orderData.supplier_id,
//       id,
//     ],
//     (err, result) => {
//       if (err) {
//         res.json({ message: "failed to update sale", err });
//       } else {
//         console.log(result);
//         res.json({ message: "successfully updated" });
//       }
//     }
//   );
// };

exports.getTotalSalesOfTheCurrentMonth = (req, res) => {
  console.log('get total sales of the current month');
  
  const date = new Date();
  const month = (Number(date.getMonth()) + 1 ).toString();
  const year = date.getFullYear();
  console.log(month, year);
  const from = year + "-" + month + "-" +"01";
  const to = year + "-" + month + "-" +"31";
  console.log(from + " -> " + to);

  dbConn.query('SELECT * FROM tb_sale WHERE ? <= invoice_date AND invoice_date <= ?', [from, to], (err, result) => {
    if(err) {
        res.status(500).json({message: 'failed to get the total current sales of the month'});
    }
    else {
      let data = 0;
      result.map((x, index) => {
        data += x.total_amount;
      });
      console.log('total sales(current month till today): ' + data)
      res.json({ data });
    }
  });
}

//get current month sales in details
exports.getCurrentMonthSale = (req, res) => {
  console.log('get current month sales in details');
  const date = new Date();
  const month = (Number(date.getMonth()) + 1 ).toString();
  const year = date.getFullYear();
  console.log(month, year);
  const from = year + "-" + month + "-" +"01";
  const to = year + "-" + month + "-" +"31";
  console.log(from + " -> " + to);

  dbConn.query('SELECT * FROM tb_sale WHERE ? <= invoice_date AND invoice_date <= ?', [from, to], (err, result) => {
      //console.log(result);
      let sales = [];
      for(var i = 0; i <= 31; i++) {
        sales[i] = 0;
      }

      result.map((x, index) => {
        //console.log(x);
        //console.log(x.invoice_date);
        let date = x.invoice_date;
        let arr = date.split("-");

        console.log(arr[2] + " : " + Number(x.total_amount));

        sales[ Number(arr[2]) ] =  sales[ Number(arr[2]) ] + Number(x.total_amount);
      });
      for(var i = 0; i < sales.length; i++) {
        console.log(i + " : " + sales[i]);
      }
      res.json({current_month_sales: sales});
  });

}
