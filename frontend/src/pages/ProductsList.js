import React, { useState, useRef, useEffect } from 'react'
import './style/pl.css'
import { Slider } from '@material-ui/core'
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'



export default function ProductsList() {
    let subCategory = useRef([]);
    let brand = useRef([]);
    let product = useRef([]);
    let paginateProduct = useRef([]);
    const [uproduct, setuProduct] = useState({});
    const [bool, setBool] = useState(false);
    const [brandBool, setBrandBool] = useState(false);
    const [productBool, setProductBool] = useState(false);
    const [selectedSubCatIdBool, setselectedSubCatIdBool] = useState(false);
    const [selectedBrandBool, setselectedBrandBool] = useState(false);
    const [selectedPageBool, setselectedPageBool] = useState(false);
    const [load, setLoad] = useState(false);
    const [loadAgain, setLoadAgain] = useState(false);
    const [val, setVal] = useState([0, 1500]);
    const [selectedSubCatId, setSelectedSubCatId] = useState(1);
    const [selectedBrandId, setSelectedBrandId] = useState(100001);
    const [selectedPage, setSelectedPage] = useState(100001);
    useEffect(() => {

        axios
            .get(`http://localhost:5000/product/products/sub-catagory`)
            .then((response) => {
                subCategory.current = response.data.data;
                setBool(true);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:5000/product/products/brand`)
            .then((response) => {
                console.log(response.data.data);
                brand.current = response.data.data;
                setBrandBool(true);
                //console.log(brand);
            }, []);

        axios
            .get(`http://localhost:5000/product/products`)
            .then((response) => {
                //console.log(response.data.rows);
                product.current = response.data.rows;

                if (selectedPage === 100001) {
                    setSelectedPage(0);
                }
                setProductBool(true);
                setselectedPageBool(true);
                //console.log(product.current);
            }, [])
    }, [load])
    const updateRange = (e, data) => {
        setVal(data);
        // console.log(val[0], val[1]);
        updateMinMax();
    }
    const updateMinMax = () => {
        //console.log(val[0], val[1]);
    }

    const handleSubCategoryChange = (e) => {
        setSelectedSubCatId(e.target.value);
        setselectedSubCatIdBool(true);
    }

    const handleBrandChange = (e) => {
        console.log(e.target.value);

        setSelectedBrandId(e.target.value);
        setselectedBrandBool(true);
    }

    const handlePageClick = (page) => {
        setSelectedPage(page.selected);
    }

    let product_id_del = 0;
    const handleDeleteConfirmation = (event, _id, p_id) => {

        let d = document.getElementById(_id);
        d.showModal();
        product_id_del = p_id;
        // console.log(product_id_del);
        /*

        product.current.map((item, i) => {
            if (item.product_id == productId) {
                index = i;
                console.log(product.current[i].quantity);
                product.current[i].quantity = 0;
                //console.log(product.current[i].quantity);
                axios.put(`http://localhost:5000/product/${product.current[i].product_id}`, product.current[i])
                    .then((res) => setLoad(true))
                    .then(() => setLoad(false))
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
        */

        //console.log(index);
    }
    const handleDelete = (e, _id) => {
        console.log(e.target.value);
        let value = e.target.value;
        let d = document.getElementById(_id);
        if (value === "1") {
            d.close();
            console.log("procced to delete");
            console.log(product_id_del);
            axios.put(`http://localhost:5000/product/delete-product/${product_id_del}`)
                .then((res) => {
                    alert("Product is Successfully deleted, please refresh the page to see the changes.");

                })
                .catch((err) => {
                    console.log(err);
                })

            //testing get products again


        } else {
            console.log("Dont delete, close the dialog.")
            d.close();
        }
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
         const { name, value } = e.target
         setuProduct((uproduct) => ({ ...uproduct, [name]: value }));
       }

       const cancelEditDialog= (e, dialogId)=>{
            let d=document.getElementById(dialogId);
            d.close();
       }

       const handleSubmit = (e, dialogId) =>{
        e.preventDefault();
        //console.log("submit");
    
    
        let len=product.current.length;
        let flag = 0;

        for(let i=0; i<len; i++){
            if(product.current[i].product_id==uproduct.product_id){
                flag=i+1;
            }
        }

        if(flag==0){
          console.log("Will access never.");
        }
        else{// update a product with id "product.product_id"
          //alert("This product is already added");
          //console.log(product.quantity);
          if(uproduct.quantity==null)uproduct.quantity=0;
          uproduct.quantity=Number(product.current[flag-1].quantity)+Number(uproduct.quantity);
          console.log(uproduct.quantity);
    
            if(uproduct.product_code ==null){ uproduct.product_code=product.current[flag-1].product_code ;}
            if(uproduct.product_id ==null){ uproduct.product_id=product.current[flag-1].product_id ;}
            if(uproduct.product_name ==null) uproduct.product_name = product.current[flag-1].product_name ;
            if(uproduct.quantity ==null) uproduct.quantity = product.current[flag-1].quantity;
            if(uproduct.vat ==null)uproduct.vat = product.current[flag-1].vat ;
            if(uproduct.sale_price ==null)uproduct.sale_price = product.current[flag-1].sale_price ;
            if(uproduct.discount ==null) uproduct.discount = product.current[flag-1].discount ;
            if(uproduct.unit_id ==null)uproduct.unit_id= product.current[flag-1].unit_id ;
            if(uproduct.brand_id ==null) uproduct.brand_id=product.current[flag-1].brand_id ;
            if(uproduct.product_native_name ==null)uproduct.product_native_name= product.current[flag-1].product_native_name ;
            if(uproduct.description ==null) uproduct.description=product.current[flag-1].description;
            if(uproduct.sub_catagory_id ==null)uproduct.sub_catagory_id = product.current[flag-1].sub_catagory_id ;
            if(uproduct.weight ==null)uproduct.weight= product.current[flag-1].weight ;
            if(uproduct.buying_price==null)uproduct.buying_price= product.current[flag-1].buying_price; 
    
            console.log(uproduct);
    
            axios.put(`http://localhost:5000/product/${uproduct.product_id}`, uproduct)
                    .then((res) => {
                      alert(uproduct.product_name + " is Successfully Updated. ");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
    
    
    
       }
    }

       const openEditDialog = (e, dialogId)=>{
        let d=document.getElementById(dialogId);
        d.showModal();
       }

    return (
        <div>

            <dialog id="deleteDialog" style={{margin:"auto", boxShadow:"1px 1px 5px 2px"}}><div>
                <h1>Are You Sure You Want to Delete?</h1>
                <div style={{textAlign:"center"}}>
                <button value="1" onClick={(e) => handleDelete(e, "deleteDialog")} style={{marginRight:"3px"}}>Yes</button>
                <button value="0" onClick={(e) => handleDelete(e, "deleteDialog")}>NO</button>
                </div>
            </div></dialog>

            <dialog id="editDialog" style={{margin:"auto", boxShadow:"1px 1px 5px 2px"}}>
                <div className="testbox">
                    <form onSubmit={(e)=>handleSubmit(e, "updateDialog")}>
                        <h1>Update product</h1>

                        <h4></h4>
                        <input className='productname' type="text" name="product_name" value={product.product_name || ''} placeholder='Product Name' onChange={handleChange} />

                        <h1></h1>
                        <input className='productNativeName' type="text" name="product_native_name" value={product.product_native_name || ''} placeholder='Product Native Name' onChange={handleChange} />


                        <div className="title-block">

                            <input className="productId" type="text" name="product_id" value={product.product_id || ''} placeholder="Product Id" onChange={handleChange} />
                            <input className="productCode" type="text" name="product_code" value={product.product_code || ''} placeholder="Product Code" onChange={handleChange} />
                        </div>
                        <div className="title-block">
                            <select name="sub_catagory_id" onChange={handleChange}>
                                <option value="">Sub Catagory</option>
                                {bool && subCategory.current.map(e => {
                                    return <option value={e.sub_catagory_id}>{e.sub_catagory_name}</option>
                                })}


                            </select>
                            <select name="brand_id" onChange={handleChange}>
                                <option value="0">Brand</option>
                                <option value="1">Pran</option>
                                <option value="2">Dano</option>
                                <option value="3">Fresh</option>
                                <option value="4">Radhuni</option>
                            </select>

                            <select name="unit_id" onChange={handleChange}>

                                <option value="0">Unit</option>
                                <option value="1">Kg</option>
                                <option value="3">gm</option>
                                <option value="2">Litre</option>
                                <option value="4">ml</option>
                                
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

                        <div class="btn-block" style={{textAlign:"center"}}>
                            <button type="submit" style={{marginRight:"3px"}}>Update Product</button>
                            <button value="0" onClick={(e)=>{cancelEditDialog(e, "editDialog")}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <div class="wrapper">

                <div class="d-sm-flex align-items-sm-center pt-2 clear">
                    <div className='wrap'>

                        <div className='price-input'>
                            <div className='field'>
                                <span>Min</span>
                                <input type="number" className='input-min' value={val[0]} />
                            </div>
                        </div>

                        <div className='separator'>-</div>
                        <div className='price-input'>
                            <div className='field'>
                                <span>Max</span>
                                <input type="number" className='input-max' value={val[1]} />
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ width: 278 }}>
                    <div style={{ marginTop: 10 }}>
                        <Slider value={val} max={3000} onChange={updateRange} />
                    </div>
                </div>

                <div class="content py-md-0 py-3">
                    <section id="sidebar">
                        <div class="py-3">
                            <h5 class="font-weight-bold">Filter Products by Sub-categories</h5>
                            <select name="sub_catagory_id" onChange={handleSubCategoryChange}>
                                <option value="0">Select Sub-category</option>
                                <option value="1">All Sub Category</option>
                                {
                                    bool && subCategory.current.map(e => {
                                        return <option value={e.sub_catagory_id}>{e.sub_catagory_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div class="py-3">
                            <h5 class="font-weight-bold">Filter Products by Brands</h5>
                            <select name="brand_id" onChange={handleBrandChange}>
                                <option value="0">Select Brand</option>
                                <option value="100001">All Brand</option>
                                {
                                    //console.log(brand)

                                    brandBool && brand.current.map(e => {
                                        return <option value={e.brand_id}>{e.brand_name}</option>
                                    })

                                }
                            </select>
                        </div>

                    </section>
                    <section id="products">
                        <div className='productListContainer'>
                            <table>
                                <thead>
                                    <tr>
                                        <th><h5>Product Id</h5></th>
                                        <th><h5>Product Name</h5></th>
                                        <th><h5>Sub-Category</h5></th>
                                        <th><h5>Quantity</h5></th>
                                        <th><h5>Price(৳)</h5></th>
                                        <th><h5>Discount(%)</h5></th>
                                        <th><h5>Delete</h5></th>
                                        <th><h5>Edit</h5></th>
                                    </tr>
                                </thead>
                                {


                                    selectedPageBool && productBool && (selectedSubCatIdBool || selectedSubCatId === 1) && (selectedBrandBool || selectedBrandId === 100001) && product.current.filter((item) => {
                                        //console.log(item.price);

                                        if (Number(item.sale_price) >= Number(val[0]) && Number(item.sale_price) <= Number(val[1]) && (selectedSubCatId == 1 || Number(selectedSubCatId) === Number(item.sub_catagory_id)) && (selectedBrandId == 100001 || Number(selectedBrandId) === Number(item.brand_id)) && (item.quantity > 0)) {
                                            return item;
                                        }

                                    }).map((e, index) => (
                                        <tbody key={index}>
                                            <td>{e.product_id}</td>
                                            <td>{e.product_name}</td>
                                            <td>{e.sub_catagory_id}</td>
                                            <td>{e.quantity}</td>
                                            <td>{e.sale_price}</td>
                                            <td>{e.discount}</td>
                                            <td><button className='deleteProduct' onClick={(event) => handleDeleteConfirmation(event, "deleteDialog", e.product_id)}><AiFillDelete /></button></td>
                                            <td><button className='editProduct' onClick={(event) => openEditDialog(event, "editDialog")}><AiTwotoneEdit /></button></td>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
