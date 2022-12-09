
const Product = function(product) {
    this.product_id = product.product_id;
    this.product_name = product.product_name;
    this.brand_id = product.brand_id;
    this.sub_catagory_id = product.sub_catagory_id;
    this.weight = product.weight; 
    this.buying_price = product.buying_price;
    this.sale_price = product.sale_price;
    this.quantity = product.quantity;
    this.discount = product.discount;
    this.vat = product.vat;
    this.unit_id = product.unit_id;
    this.product_native_name = product.product_native_name
    this.description = product.description;
    this.is_available = 1;
}

module.exports = Product;