const { date } = require("yup");

let objectDate = new Date();


let day = objectDate.getDate();
///console.log(day); // 23

let month = (objectDate.getMonth() ) + 1;
//console.log(month + 1); // 8

let year = objectDate.getFullYear();
///console.log(year); // 2022

let format3 = year + "-" + month + "-" + day;


///let Date=new date();

const Sale = function (sale) {
  //this.invoice_id = sale.invoice_id;
  this.total_amount = sale.total_amount;
  this.payment_status = sale.payment_status;
  this.invoice_date = format3;
  this.time = objectDate;
};

module.exports = Sale;
