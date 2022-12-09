const e = require('express');
const dbConn = require('../config/db.config');

exports.getInvoiceId = (req, res) => {
    console.log('get invoice id');
    dbConn.query('SELECT MAX(invoice_id ) AS id FROM tb_sale', (err, result) => {
        if(err) {
            res.json({message: 'failed to get invoice id', err});
        }else {
            const id = result[0].id;
            let iid = Number(id);
            iid = iid + 1;
            res.json({invoice_id: iid});
        }
    });
}