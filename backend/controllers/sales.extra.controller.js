const dbConn = require('../config/db.config');


// //get sale details by id
// exports.getSalesDetailById = (req, res)=> {
//     const id = req.params.id;
//     console.log('$$$$...' + id);
//     let query = 'SELECT *FROM tb_sale_details WHERE invoice_id = ?';
//     dbConn.query(query, id, (err, result) => {
//         if(err) {
//             res.json( {message: 'failed to get sales details', err});
//         }
//         else {
//             console.log('get sale details by id is ok..');
//             res.send(result);
//         }
//     });
// };

//get sale details by date
exports.getx = (req, res)=> {
    const from = req.query.from;
    const to = req.query.to;

    console.log('.............');
    console.log("=>" + from + ", " + to);
    let query = 'SELECT * FROM tb_sale_details WHERE ? <= invoice_date AND invoice_date <= ?';
    dbConn.query(query, [from, to], (err, result) => {
        if(err) {
            res.json( {message: 'failed to get sales details by date', err});
        }
        else {
            console.log('get sale details by date is ok..');
            res.send(result);
        }
    });
};

//get full details of sales by date
exports.getTotalSaleByDate = (req, res)=> {
    const date = req.params.date;
    console.log('getTotalSaleByDate...' + date);
    let query = 'SELECT * FROM tb_sale, tb_sale_details WHERE tb_sale.invoice_date=? AND tb_sale.invoice_id=tb_sale_details.invoice_id';
    dbConn.query(query, date, (err, result) => {
        if(err) {
            res.json( {message: 'failed to getTotalSaleByDate', err});
        }
        else {
            console.log('getTotalSaleByDate ok..');
            res.send(result);
        }
    });
};


// //get full details of sales by id
// exports.getTotalSaleById = (req, res)=> {
//     const id = req.params.id;
//     console.log('getTotalSaleById ...' + id);
//     let query = 'SELECT * FROM tb_sale, tb_sale_details WHERE tb_sale.invoice_id=? AND tb_sale.invoice_id=tb_sale_details.invoice_id';
//     dbConn.query(query, id, (err, result) => {
//         if(err) {
//             res.json( {message: 'failed to getTotalSaleById', err});
//         }
//         else {
//             console.log('getTotalSaleById  ok..');
//             res.send(result);
//         }
//     });
// };

//get revenue from overall sales using date
exports.getRevenue = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    console.log(from + ', ' + to);
    let query = 'SELECT SUM(total_amount) AS total_amount FROM tb_sale WHERE ? <= invoice_date AND invoice_date <= ?';
    dbConn.query(query, [from, to], (err, result, f)=>{
        //console.log(result);
        //console.log(f);
        if(err) {
            res.json( {message: 'failed to get revenue', err});
        }
        else {
            res.json({msessage: result});
        }
    })
};

//get cost of good sold from overall sales using date
exports.getCostOfGoodsSold = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    console.log('cost  of goods sold...');
    console.log(from + ', ' + to);
    //let query = 'SELECT * FROM tb_product, tb_sale, tb_sale_details WHERE tb_sale.invoice_id=tb_sale_details.invoice_id AND ?<= tb_sale.invoice_date AND tb_sale.invoice_date<=? AND tb_sale_details.product_id=tb_product.product_id';
    let query =  'SELECT SUM(tb_product.buying_price * tb_sale_details.quantity) As cost_of_goods FROM tb_product, tb_sale, tb_sale_details WHERE tb_sale.invoice_id=tb_sale_details.invoice_id AND ?<= tb_sale.invoice_date AND tb_sale.invoice_date<=? AND tb_sale_details.product_id=tb_product.product_id';
    dbConn.query(query, [from, to], (err, result, f)=>{
        //console.log(result);
        //console.log(f);
        if(err) {
            res.json( {message: 'failed to get cost of good sold', err});
        }
        else {
            res.json({msessage: result});
        }
    })
};


