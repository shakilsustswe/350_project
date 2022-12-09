const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

//all routes
const productRouter = require('./routes/product.route');
const orderRouter = require('./routes/order.route');
const orderdetailsRouter = require('./routes/order.details.route');
const saleRoute = require('./routes/sale.route');
const saleDetailsRoute = require('./routes/sale.details.route');
const invoiceRoute = require('./routes/invoice.router');
const employeeRouter = require('./routes/employee.route');
const salesExtraRouter = require('./routes/sales.extra.route');
const orderExtraRouter = require('./routes/order.extra.route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


// define a root route
app.get('/', (req, res) => {
    res.send("welcome to dashboard...");
});

//product route
app.use("/product", productRouter);


//employee route
app.use('/employee', employeeRouter);

//order
app.use("/order", orderRouter);
app.use("/orderdetails", orderdetailsRouter);

//order extra: for report
app.use('/orders', orderExtraRouter);

//sale
app.use("/sale", saleRoute);
app.use("/sale-details", saleDetailsRoute);

//sales extra: for report
app.use('/sales', salesExtraRouter);


//invoice
app.use("/invoice", invoiceRoute);


//handle bad url
app.use((req, res, next)=>{
    res.status(404).json({
        "message": "Error! Page not found"
    });
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});