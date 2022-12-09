const productModel = require('../models/product.model');
const dbConn = require('../config/db.config');
const Product = require('../models/product.model');

//get all product
exports.getAllProducts = (req, res) => {
    console.log('get all products');
    dbConn.query('SELECT * FROM tb_product where is_available=1', (err, rows, fields) => {
        if (err)
            res.json({ message: 'failed to get product list', error: err });
        else {
            console.log(rows);
            res.json({ message: 'success', rows });
        }

    });
    //res.send('product list...');
};

//get a product
exports.getProductById = (req, res) => {
    console.log('get a product...');

    const id = req.params.id;
    dbConn.query('SELECT * FROM tb_product WHERE product_id=?', id, (err, result) => {
        if (err)
            res.json({ product_id: id, message: 'failed to get the product', error: err });
        else {
            console.log(result);
            res.json({ message: 'success', result });
        }
    });
};

//get all unit
exports.getAllUnit = (req, res) => {
    console.log('get all unit...');
    dbConn.query('SELECT * FROM tb_unit', (err, result) => {
        if (err)
            res.json({ message: 'failed to get all unit' });
        else {
            console.log(result);
            res.json({ message: 'success', data: result });
        }
    });
};

//get all brand
exports.getAllBrand = (req, res) => {
    console.log('get all brand...');
    dbConn.query('SELECT * FROM tb_brand', (err, result) => {
        if (err)
            res.json({ message: 'failed to get all brand' });
        else {
            console.log(result);
            res.json({ message: 'success', data: result });
        }
    });
};


//get all catagory
exports.getAllCatagory = (req, res) => {
    console.log('get all catagory...');
    dbConn.query('SELECT * FROM tb_product_catagory', (err, result) => {
        if (err)
            res.json({ message: 'failed to get all catagory', err });
        else {
            console.log(result);
            res.json({ message: 'success', data: result });
        }
    });
};

//get all sub-catagory
exports.getAllSubCatagory = (req, res) => {
    console.log('get all sub catagory...');
    dbConn.query('SELECT * FROM tb_product_sub_catagory', (err, result) => {
        if (err)
            res.json({ message: 'failed to get all sub catagory', err });
        else {
            console.log(result);
            res.json({ message: 'success', data: result });
        }
    });
};

//add a new product
exports.addProduct = (req, res) => {
    console.log('insert a product');
    const productData = new Product(req.body);
    console.log(productData);
    dbConn.query('INSERT INTO tb_product SET ?', productData, (err, result) => {
        if (err) {
            res.json({ message: 'failed to add product', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully added' });
        }
    });

};

//update a product
exports.updateProduct = (req, res) => {
    const id = req.params.id;
    console.log('update a product');
    const {product_name, quantity, vat, discount, sale_price, buying_price, weight, unit_id, brand_id, sub_catagory_id, product_native_name, description} = new Product (req.body);
    const productData = new Product (req.body);
    console.log(productData);
    dbConn.query('UPDATE tb_product SET product_name=?, quantity=?, vat=?, discount=?, sale_price=?, buying_price=?, weight=?, unit_id=?, brand_id=?, sub_catagory_id=?, product_native_name=?, description=?, is_available=? WHERE product_id=?',  [product_name, quantity, vat, discount, sale_price, buying_price, weight, unit_id, brand_id, sub_catagory_id, product_native_name, description, 1, id], (err, result) => {
        if (err) {
            res.json({ message: 'failed to update product', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully updated' });
        }
    });
}

//delete a product by id
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    console.log('delete a product: ' + id);
    dbConn.query('UPDATE tb_product SET is_available=?  WHERE product_id=?',  [0, id], (err, result) => {
        if (err) {
            res.json({ message: 'failed to delete the product', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully deleted' });
        }
    });
};


//get top selling products of the current month
exports.getTopSellingProduct = (req, res) => {

    console.log('get top selling product...');

    const date = new Date();
    const month = (Number(date.getMonth()) + 1 ).toString();
    const year = date.getFullYear();
    console.log(month, year);
    const from = year + "-" + month + "-" +"01";
    const to = year + "-" + month + "-" +"31";
    console.log(from + " -> " + to);

    dbConn.query('SELECT * FROM tb_sale_details WHERE ? <= invoice_date AND invoice_date <= ?', [from, to], (err, result) => {
        console.log(result);

        let data = [];

        result.map((x) => {

            let cost = x.total_price;
            let quantity = x.quantity;
            let id = x.product_id;
            //console.log(id + ", " + cost + ", " + quantity);

            let check = false;
            for(var i = 0; i < data.length; i++) {
                if(data[i].product_id === id) {
                    data[i].product_quantity =  data[i].product_quantity + quantity;
                    data[i].total_cost =  data[i].total_cost + cost;
                    check = true;
                }
            }
            if(!check) {
                data = [...data, { product_id: id, product_quantity: quantity, total_cost: cost} ];
            }
            console.log(data);
        });

        data.sort((a, b)=> {
            return a.product_quantity - b.product_quantity;
        });
        
        console.log('after sort: ');
        console.log(data);

        console.log('after reverse sort: ');
        data.reverse();
        console.log(data);

        res.json({message: "success",data});
    });
  
  }


  //get stock worth 
  exports.getStockWorth = (req, res) => {

    console.log('stock worth....');
    dbConn.query('SELECT SUM(quantity * sale_price) AS stock_worth FROM tb_product', (err, result) => {
        if(err) {
            res.status(500).json({message: 'failed to get stock worth'});
        }
        else {
            res.status(200).json({result});
        }
    });

  }

