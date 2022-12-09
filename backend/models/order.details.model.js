

const Order = function (orderDetails) {
  this.order_id = order.order_id;
  this.product_name = order.product_name;
  this.product_id = order.product_id;
  this.quantity = order.quantity;
  this.vat = order.vat;
  this.discount = order.discount;
  this.total_price = order.total_price;
  this.product_description = order.product_description;
  this.rate = order.rate;
};

module.exports = Order;
