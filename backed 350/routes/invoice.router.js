const router = require("express").Router();
const invoiceController = require('../controllers/invoice.controller');

//get invoice id for invoice generation
router.get('/generate-invoice-id', invoiceController.getInvoiceId);


module.exports = router;