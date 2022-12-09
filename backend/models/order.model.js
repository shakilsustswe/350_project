

const Order = function (order) {
  this.order_id = order.order_id;
  this.total_cost = order.total_cost;
  this.payment_status = order.payment_status;
  this.order_date = order.order_date;
  this.supplier_id = order.supplier_id;
};

module.exports = Order;
