const dbConn = require('../config/db.config');

//get total purchase from overall orrder using date
exports.getTotalPurchase = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    console.log(from + ', ' + to);
    //let query = 'SELECT * FROM tb_order WHERE ? <= order_date AND order_date <= ?';
    let query = 'SELECT SUM(total_cost) As total_cost FROM tb_order WHERE ? <= order_date AND order_date <= ?';
    dbConn.query(query, [from, to], (err, result, f)=>{
        //console.log(result);
        //console.log(f);
        if(err) {
            res.json( {message: 'failed to get total cost', err});
        }
        else {
            res.json({msessage: result});
        }
    })
};