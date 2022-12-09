const { date } = require("yup");

let objectDate = new Date();


let day = objectDate.getDate();
///console.log(day); // 23

let month = objectDate.getMonth() + 1;
//console.log(month + 1); // 8

let year = objectDate.getFullYear();
///console.log(year); // 2022

let format3 = year + "-" + month + "-" + day;


///let Date=new date();

const SaleDetails = function (saleDetails) {
  this.product_name = saleDetails.product_name;
  this.product_native_name = saleDetails.product_native_name;
  this.product_id = saleDetails.product_id;
  this.quantity = saleDetails.quantity;
  this.vat = saleDetails.vat;
  this.discount = saleDetails.discount;
  this.total_price = saleDetails.total_price;
  this.product_description = saleDetails.product_description;
  this.rate = saleDetails.rate;
  this.invoice_id = saleDetails.invoice_id;
  
};

module.exports = SaleDetails;
