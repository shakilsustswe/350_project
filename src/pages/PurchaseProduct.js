import axios from 'axios';
import {
    MDBBtn, MDBCol,
    MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead
} from "mdb-react-ui-kit";
import React, { useEffect, useState,useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './style/productList.css';
import { Navigate } from 'react-router-dom';

export default function PurchaseProduct() {
   let invoice_id=useRef();
   const show=useRef(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [purchaseQuantity, setPurchaseQuantity] = useState("");
    const [totalAmount, setTotalCost] = useState(0);
    const [showInvoice,setShowInvoice]=useState(false);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handlePurchaseQuantityChange = (e) => {
        setPurchaseQuantity(e.target.value);
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/invoice/generate-invoice-id`)
        .then((res) => {
            
            invoice_id.current=res.data.invoice_id})
        .catch((err) => {
            console.log(err);
        })
    },[])

    //handlePurchaseQuantityChange

    const handleChangeQuantity = (event, key) => {
        const { name, value } = event.target;
        console.log(data)
        const list = [...data];

        list[key][name] = value;

        setData(list);
    }
    let total = 0;
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.get(`http://localhost:5000/product/${value}`)
            .then((res) => res.data)
            .then((resData) => {
                //console.log(resData.result[0]);
                setData([...data, {
                    ...resData.result[0]
                    , purchase_quantity: '0',
                    totalPrice: '0'
                }]);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updateData = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].quantity < data[i].purchase_quantity) {
                alert("Not enough stock");
                break;
            }


            data[i].quantity -= data[i].purchase_quantity;
            console.log(data[i]);
            axios.put(`http://localhost:5000/product/${data[i].product_id}`, data[i])
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err);
                })
        }
        let invoice={
            invoice_id,
            total_amount:totalAmount
        }
        axios.post(`http://localhost:5000/sale/add-sale`,invoice)
        .then((res) => {
            
            console.log(res.data);
            for (let i = 0; i < data.length; i++) {
                let sale = {};
                sale.product_id = data[i].product_id;
                sale.quantity = data[i].purchase_quantity;
                sale.vat = data[i].vat;
               
                sale.discount = data[i].discount;
               
                sale.total_price = data[i].totalPrice;
                sale.product_description = data[i].description;
                sale.rate = data[i].sale_price;
                sale.invoice_id = invoice_id.current;
                sale.invoice_date=year + "-" + mon + "-" + dat;
                console.log(sale);
                data[i].rate = data[i].sale_price;
                data[i].invoice_id = 1;
                data[i].date = year + "-" + mon + "-" + dat;
                data[i].time = "123456";
                data[i].payment_status = "Paid";
                data[i].quantity -= data[i].purchase_quantity;
                //console.log(data[i]);
                
                console.log("rifat : ", sale);
                axios.post(`http://localhost:5000/sale-details`, sale)
                    .then((res) => {
                        console.log(show.current);
                       show.current=true;
                       console.log(show.current);
                       setShowInvoice(true);
                }
                    )
                    .catch((err) => {
                        console.log(err);
                    })
            }
        
        }
        )
        .catch((err) => {
            console.log(err);
        })
        console.log("Nahid");
        
       
        const date = new Date();
        const year = date.getFullYear();
        const mon = (Number(date.getMonth()) + 1).toString();
        const dat = date.getDate();
        //console.log(dat + " /" + mon + "/" + year);
       // let invoice_id = Math.floor(10 + Math.random() * 10000000);
     

    }
    const price = (p, i) => {
        // console.log(data.totalPrice);
        data[i].totalPrice = Number(data[i].totalPrice) + p;
        console.log(data[i].totalPrice);
        for (let j = 0; j <= i; j++) {
            total += data[j].totalPrice;
        }
        console.log(total);
        setTotalCost(total);

    }


    return (
        <MDBContainer className='container'>
            <form style={{
                marginLeft: "auto",
                padding: "15px",
                maxWidth: "600px",
                alignContent: "center",
            }}
                className="d-flex input-group w-auto"
                onSubmit={handleSubmit}
            >
  {showInvoice&&<Navigate to={`/showinvoice/${invoice_id.current}`}></Navigate>}
                <div className='input-container'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Search Product by id...'

                        value={value}
                        onChange={handleChange}
                    />

                    <MDBBtn type="submit" color="dark">Get Product by Id</MDBBtn>
                </div>


            </form>

            <div style={{ marginTop: "15px" }}>
                <h3 className='text-center'>Products Added to Cart</h3>
                <MDBRow>
                    <MDBCol size="12">
                        <MDBTable>
                            <MDBTableHead dark>
                                <tr>
                                    <th scope='col'>NO.</th>
                                    <th scope='col'>ProductName</th>
                                    <th scope='col'>ProductCode</th>
                                    <th scope='col'>SalePrice</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'>Purchase Quantity</th>
                                    <th scope='col'>Total Price</th>
                                </tr>
                            </MDBTableHead>
                            {
                                data.length === 0 ? (
                                    <MDBTableBody>
                                        <tr>
                                            <td colSpan={8} className="text-center mb-0">No Data Found</td>
                                        </tr>
                                    </MDBTableBody>
                                ) : (


                                    data.map((item, key) => (
                                        <MDBTableBody key={key}>
                                            <tr key={key}>
                                                <th scope='row'>{item.product_id}</th>
                                                <td>{item.product_name}</td>
                                                <td>{item.product_code}</td>
                                                <td>{item.sale_price}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <input
                                                        type="numeric"
                                                        name="purchase_quantity"
                                                        value={item.purchase_quantity || ''}

                                                        onChange={(e) => {
                                                            handleChangeQuantity(e, key)
                                                            price(Number(item.sale_price) * item.purchase_quantity, key);
                                                        }}

                                                    />
                                                </td>
                                                <td>
                                                    {Number(item.sale_price) * item.purchase_quantity}
                                                    {/* {console.log((Number(totalAmount)+Number(item.sale_price)*item.purchase_quantity))} */}

                                                </td>
                                            </tr>
                                        </MDBTableBody>
                                    ))
                                )
                            }


                        </MDBTable>
                    </MDBCol>
                </MDBRow>
              
                <button onClick={updateData}>Submit</button>

            </div>

            {/* <form style={{
                marginLeft: "auto",
                padding: "15px",
                maxWidth: "600px",
                alignContent: "center",
            }}
                className="d-flex input-group w-auto"
                onSubmit={handleSubmit}
            >


                <MDBBtn type="submit" color="dark">Search</MDBBtn>
                <MDBBtn className='mx-2' color="info">button</MDBBtn>

            </form> */}

        </MDBContainer>)
}
