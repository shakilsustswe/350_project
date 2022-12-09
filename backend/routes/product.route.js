const router = require("express").Router();
const productConstroller = require("../controllers/product.controller");

//get all product
router.get("/products", productConstroller.getAllProducts);

//get product by id
router.get("/:id", productConstroller.getProductById);

//get all unit
router.get("/products/unit", productConstroller.getAllUnit);

//get all brand
router.get("/products/brand", productConstroller.getAllBrand);

//get all catagory
router.get("/products/catagory", productConstroller.getAllCatagory);

//get all sub-catagory
router.get("/products/sub-catagory", productConstroller.getAllSubCatagory);

//add product
router.post("/add-product", productConstroller.addProduct);

//update product
router.put("/:id", productConstroller.updateProduct);

//delete product
router.put("/delete-product/:id", productConstroller.deleteProduct);


//get top selling products
router.get('/report/top-selling-product', productConstroller.getTopSellingProduct);

router.get('/report/stock-worth', productConstroller.getStockWorth);

module.exports = router;