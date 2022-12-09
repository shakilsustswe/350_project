import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './style/addProduct.css'

function AddProduct() {

  let category = useRef([]);
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState({});
  const [bool, setBool] = useState(false);
  const [allProductsBool, setAllProductsBool] = useState(false);



  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/products/sub-catagory`)
      .then((response) => {
        category.current = response.data.data;
        setBool(true);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5000/product/products`)
      .then((response) => {
        //console.log(response.data.rows);
        setAllProducts(response.data.rows);
        setAllProductsBool(true);

      })
      .catch((err) => console.log(err));

  }, []);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target
    setProduct((product) => ({ ...product, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("submit");

    let len = allProducts.length;
    let flag = 0;

    console.log(allProducts);
    for (let i = 0; i < len; i++) {
      if (allProducts[i].product_id == product.product_id) {
        flag = i + 1;
      }
    }

    console.log("flag : ", flag);

    if (flag == 0) {

      if (product.product_id == null) {
        alert("You must enter product's id.");
      } else {
        axios
          .post("http://localhost:5000/product/add-product", product)
          .then((res) => {
            setProduct([]);
            console.log(res.data);
            console.log("product : ", product);
            alert(product.product_name + " is Successfully Added");
          })
          .catch((err) => console.log(err));
      }
    }
    else {// update a product with id "product.product_id"
      //alert("This product is already added");
      //console.log(product.quantity);
      if (product.quantity == null) product.quantity = 0;
      product.quantity = Number(allProducts[flag - 1].quantity) + Number(product.quantity);
      console.log(product.quantity);

      if (product.product_code == null) { product.product_code = allProducts[flag - 1].product_code; }

      if (product.product_name == null) product.product_name = allProducts[flag - 1].product_name;
      if (product.quantity == null) product.quantity = allProducts[flag - 1].quantity;
      if (product.vat == null) product.vat = allProducts[flag - 1].vat;
      if (product.sale_price == null) product.sale_price = allProducts[flag - 1].sale_price;
      if (product.discount == null) product.discount = allProducts[flag - 1].discount;
      if (product.unit_id == null) product.unit_id = allProducts[flag - 1].unit_id;
      if (product.brand_id == null) product.brand_id = allProducts[flag - 1].brand_id;
      if (product.product_native_name == null) product.product_native_name = allProducts[flag - 1].product_native_name;
      if (product.description == null) product.description = allProducts[flag - 1].description;
      if (product.sub_catagory_id == null) product.sub_catagory_id = allProducts[flag - 1].sub_catagory_id;
      if (product.weight == null) product.weight = allProducts[flag - 1].weight;
      if (product.buying_price == null) product.buying_price = allProducts[flag - 1].buying_price;

      console.log(product);

      axios.put(`http://localhost:5000/product/${product.product_id}`, product)
        .then((res) => {
          alert(product.product_name + " is Successfully Updated. ");
        })
        .catch((err) => {
          console.log(err);
        })
      //product.quantity=null;
    }
  }
  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    let len=allProducts.length;
    let flag = 0;

    for(let i=0; i<len; i++){
        if(allProducts[i].product_id===product.product_id){
            flag=i+1;
        }
    }

    console.flag("flag : " , flag);
    
    if(flag==0){//add a new product;
      console.log("Add Product section , flag : " , flag);
      axios
      .post("http://localhost:5000/product/add-product", product)
      .then((res) => {
        setProduct([]);
        console.log(res.data)})
      .catch((err) => console.log(err));
    }
    
    
    if(flag==1){// update a product with id "product.product_id"
        product.quantity+=allProducts[flag-1].quantity;
        if(product.product_code ==null){ product.product_code=allProducts[flag-1].product_code ;}

        if(product.product_name ==null) product.product_name = allProducts[flag-1].product_name ;
        if(product.quantity ==null) product.quantity = allProducts[flag-1].quantity;
        if(product.vat ==null)product.vat = allProducts[flag-1].vat ;
        if(product.sale_price ==null)product.sale_price = allProducts[flag-1].sale_price ;
        if(product.discount ==null) product.discount = allProducts[flag-1].discount ;
        if(product.unit_id ==null)product.unit_id= allProducts[flag-1].unit_id ;
        if(product.brand_id ==null) product.brand_id=allProducts[flag-1].brand_id ;
        if(product.product_native_name ==null)product.product_native_name= allProducts[flag-1].product_native_name ;
        if(product.description ==null) product.description=allProducts[flag-1].description;
        if(product.sub_catagory_id ==null)product.sub_catagory_id = allProducts[flag-1].sub_catagory_id ;
        if(product.weight ==null)product.weight= allProducts[flag-1].weight ;
        if(product.buying_price==null)product.buying_price= allProducts[flag-1].buying_price; 

        console.log(product);

        axios.put(`http://localhost:5000/product/${product.product_id}`, product)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err);
                })
                

    }
    
  }
  */
  return (

    <div className="testbox">
      <form onSubmit={handleSubmit}>
        <h1>Add/Update products</h1>

        <h4>Product details<span></span></h4>
        <input className='productname' type="text" name="product_name" value={product.product_name || ''} placeholder='Product Name' onChange={handleChange} />

        <h1></h1>
        <input className='productNativeName' type="text" name="product_native_name" value={product.product_native_name || ''} placeholder='Product Native Name' onChange={handleChange} />

        <h4>Product Id<span>*</span></h4>
        <div className="title-block">

          <input className="productId" type="text" name="product_id" value={product.product_id || ''} placeholder="Product Id" onChange={handleChange} />
          <input className="productCode" type="text" name="product_code" value={product.product_code || ''} placeholder="Product Code" onChange={handleChange} />
        </div>
        <h4></h4>

        <div className="title-block">
          <select name="sub_catagory_id" onChange={handleChange}>
            <option value="">Sub Catagory</option>
            {bool && category.current.map(e => {
              return <option value={e.sub_catagory_id}>{e.sub_catagory_name}</option>
            })}


          </select>
          <select name="brand_id" onChange={handleChange}>
            <option value="0">Brand</option>
            <option value="1">Pran</option>
            <option value="2">Dano</option>
            <option value="3">Fresh</option>
            <option value="4">Radhuni</option>
            <option value="5">ACI</option>
          </select>

          <select name="unit_id" onChange={handleChange}>

            <option value="0">Unit</option>
            <option value="1">Kg</option>
            <option value="3">gm</option>
            <option value="2">Litre</option>
            <option value="4">Pcs</option>

          </select>
        </div>

        <div className="title-block">

          <input className="quantity" type="text" name="quantity" value={product.quantity || ''} placeholder="Quantity" onChange={handleChange} />
          <input className="weight" type="text" name="weight" value={product.weight || ''} placeholder="Weight" onChange={handleChange} />
          <input className="vat" type="text" name="vat" value={product.vat || ''} placeholder="Vat" onChange={handleChange} />
        </div>

        <div className="title-block">

          <input className="buyingPrice" type="text" name="buying_price" value={product.buying_price || ''} placeholder="Buying Price" onChange={handleChange} />
          <input className="sale_price" type="text" name="sale_price" value={product.sale_price || ''} placeholder="Sale Price" onChange={handleChange} />
          <input className="discount" type="text" name="discount" value={product.discount || ''} placeholder="Discount" onChange={handleChange} />
        </div>

        <h4>Product Description</h4>
        <textarea rows="5" name='description' value={product.description || ''} onChange={handleChange}></textarea>
        <div class="btn-block">
          <button type="submit">Add/Update Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct