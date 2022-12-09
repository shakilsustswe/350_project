import axios from 'axios';
import {
    MDBBtn, MDBCol,
    MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead
} from "mdb-react-ui-kit";
import { LineChart, Line, PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Label, LabelList } from 'recharts'
import React, { useEffect, useState } from 'react';
import './style/dashboard.css';
import { Tooltip } from '@material-ui/core';

export default function Dashboard() {
    const [stock, setStock] = useState(0);
    const [product, setProduct] = useState([]);
    const [currentMonthSell, setcurrentMonthSell] = useState(0);
    //const [current_month_sales, setCurrent_month_sales] = useState([{day:"", _sale:""}]);
    const [current_month_sales, setCurrent_month_sales] = useState([]);
    const [top, setTop] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [employee, setEmployee] = useState([]);
    //const [temp, setTemp] = useState([{day:'0', _sale:'0'}]);
    const [temp, setTemp] = useState({ day: '0', _sale: '0' });
    const [sale, setSale] = useState({ day: "", _sale: "" });
    const [bool, setBool] = useState(false);
    const [topBool, setTopBool] = useState(false);
    const [apbool, setapbool] = useState(false);
    const [stockBool, setStockBool] = useState(false);
    const [employeeBool, setEmployeeBool] = useState(false);
    const [productBool, setProductBool] = useState(false);


    useEffect(() => {

        axios
            .get(`http://localhost:5000/product/products`)
            .then((response) => {
                //console.log(response.data.rows);
            setProduct(response.data.rows);
                setProductBool(true);
            }, []).catch((err)=>{
                console.log(err);
            })


        axios.get(`http://localhost:5000/product/products`)
            .then((res) => {
                console.log("res : ", res.data.rows);
                setAllProducts(res.data.rows);
                setapbool(true);
            }).catch((err)=>{
                console.log(err);
            })


        //stock;
        axios.get(`http://localhost:5000/product/report/stock-worth`)
            .then((res) => {
                //console.log(res.data.result[0].stock_worth);
                setStock(res.data.result[0].stock_worth);
                setStockBool(true);
            })
            .catch((err) => {
                console.log(err);
            })

        //sale current month
        axios.get(`http://localhost:5000/sale/report/total-sales-of-the-month`)
            .then((res) => {
                //console.log(res.data.data);
                setcurrentMonthSell(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })

        //top saling product
        //there is an issue
        axios.get(`http://localhost:5000/product/report/top-selling-product`)
            .then((res) => {
                console.log(res.data.data);

                setTop(res.data.data);
                setTopBool(true);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`http://localhost:5000/sale/report/current-month-sales`)
            .then((res) => {

                //setCurrent_month_sales(res.data.current_month_sales);
                let data = [...res.data.current_month_sales];
                //console.log("bal:" + data);
                //console.log("len: " + data.length);
                //temp[0].day='1';
                //temp[0]._sale=res.data.current_month_sales[1];
                //setCurrent_month_sales(...temp);

                // for(let i=2; i<32; i++){
                //     //temp[0].day=toString(i);
                //     //temp[0]._sale=toString(res.data.current_month_sales[i]);
                //     //setCurrent_month_sales(...current_month_sales,...temp);
                //     setCurrent_month_sales(...current_month_sales, temp);
                // }
                let tmp = [], cnt = 0;
                const currMonth = (new Date()).getMonth();
                //console.log("current month: " + currMonth);
                if (currMonth === "0" || currMonth === "2" || currMonth === "4" || currMonth === "6" || currMonth === "7" || currMonth === "9" || currMonth === "11") {
                    cnt = 0;
                }
                else if (currMonth === "1") {
                    cnt = 3;
                }
                else {
                    cnt = 1;
                }
                for (let i = 1; i < data.length - cnt; i++) {
                    const x = {
                        day: (i).toString(),
                        _sale: data[i]
                    };
                    //console.log(i + " : " + data[i]);
                    //console.log("#" + x.day + ", " + x._sale);
                    //console.log("=>" + x);
                    tmp = [...tmp, x];
                }
                //console.log("printing current month sale: ");
                //console.log(tmp);
                setCurrent_month_sales({ current_month_sales: tmp });
                setBool(true);
            })
            .catch((err) => {
                console.log(err);
            })

        axios
            .get("http://localhost:5000/employee/employees")
            .then((response) => {
                setEmployee(response.data.result);
                setEmployeeBool(true);
            })
            .catch((err) => {console.log(err)});

    }, [])

    const data = [
        {
            name: "Facebook", value: 100
        },
        {
            name: "Instagram", value: 70
        },
        {
            name: "twitter", value: 65
        },
    ];

    const data_2 = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]


    return (
        <div className='main'>
            <div class="grid-container">
                <div class="item1">Super Shop Management System
                </div>
                <div class="item2">
                    <h1>Top Selling Products</h1>
                    <div className='productListContainer'>
                        <table>
                            <thead>
                                <tr>
                                    <th><h5>Serial</h5></th>
                                    <th><h5>Name</h5></th>
                                    <th><h5>Quantity</h5></th>
                                    <th><h5>Price(৳)</h5></th>
                                </tr>
                            </thead>
                            {

                                topBool && apbool && top.map((item, index) => {

                                    if (index < 10) {
                                        // console.log(index);
                                        // return (
                                        //     <tbody>
                                        //         <td>Hello inside if</td>
                                        //     </tbody>
                                        // )
                                        return allProducts.map((itm, key) => {

                                            if (itm.product_id === item.product_id) {
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{itm.product_name}</td>
                                                            <td>{item.product_quantity}</td>
                                                            <td>{item.total_cost}</td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        }
                                        )
                                    }
                                    else {
                                        return (
                                            <tbody>
                                                <td></td>
                                            </tbody>
                                        )
                                    }
                                    // if (index < 10) {
                                    //     //product_id = item.product_id
                                    //     allProducts.map((itm) => {
                                    //         if (itm.product_id === item.product_id) {
                                    //             //console.log(itm.product_name, item.product_quantity, item.total_cost);
                                    //             return (<tbody key={index}>
                                    //                 <tr>
                                    //                     <td>{index + 1}</td>
                                    //                     <td>{itm.product_name}</td>
                                    //                     <td>{itm.product_quantity}</td>
                                    //                     <td>{itm.total_cost}</td>
                                    //                 </tr>
                                    //             </tbody>)
                                    //         }
                                    //     })
                                    // }
                                })

                            }
                        </table>
                    </div>
                </div>
                <div class="item5">
                    <div className='graph'>
                        <BarChart
                            width={730}
                            height={250}
                            data={current_month_sales.current_month_sales}
                            margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day">
                                <Label value="Days of current month " offset={-8} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'Sale per day(tk)', angle: -90, position: 'insideLeft' }} />
                            <Bar dataKey="_sale" fill="#8884d8">
                                <LabelList dataKey="_sale" position="top" angle={300} />
                            </Bar>
                        </BarChart>
                    </div>

                </div>
                <div class="item6">
                    Employee <br/>
                    <div>{employee.length}</div>
                </div>
                <div class="item7">Products<br/> <div>{product.length} </div></div>
                <div class="item8">Stock <br /> <div>{stock} <span>৳</span></div></div>
                
                <div class="item10">Current Month's Sale(till now) <br/> <div>{currentMonthSell}<span>৳</span></div></div>
                

                {
                    bool && console.log(current_month_sales)
                }

            </div>
        </div >
    )


    // const [data, setData] = useState([]);
    // const [product, setProduct] = useState();
    // const [value, setValue] = useState("");
    // const [cart, setCart] = useState([]);

    // const handleChange = (e) => {
    //   setValue(e.target.value);
    // }

    // const handleChangeQuantity = (event, key) => {
    //   const { name, value } = event.target;
    //   console.log(cart)
    //   const list = [...cart];

    //   list[key][name] = value;

    //   setCart(list);
    // }

    // const handleSearch = async (e) => {
    //   e.preventDefault();

    //   // loadUsersData();
    //   // data.map((item) => setCart([...cart, item]));

    //   const url = `http://localhost:5000/product/${value}`;
    //   console.log("url : ", url);
    //   axios.get(`http://localhost:5000/product/${value}`)
    //     .then((res) => res.data)
    //     .then((data) => {

    //      [data].map((item, index) => {
    //         console.log("item : ", item);
    //         // setCart([...cart, {
    //         //     item,
    //         //     quantity: '',
    //         //     totalPrice:'high'
    //         //   }]);
    //        // setCart(...cart, item);
    //        setCart([...cart, item]);
    //        console.log(cart.length);
    //      }  
    //      );
    //       //console.log(data[0])

    //       console.log("cart length : ", cart.length);
    //     })
    //     .catch((err) => {
    //       // setCart([...cart, {}]);
    //       console.log(err);
    //     })
    // };



    // return (
    //   <MDBContainer className='container'>
    //     <form style={{
    //       marginLeft: "auto",
    //       padding: "15px",
    //       maxWidth: "500px",
    //       alignContent: "center",
    //     }}
    //       className="d-flex input-group w-auto"
    //       onSubmit={handleSearch}
    //     >

    //       <input
    //         type="text"
    //         className='form-control'
    //         placeholder='Search Product...'

    //         value={value}
    //         onChange={handleChange}
    //       />


    //       <MDBBtn type="submit" color="dark">Search</MDBBtn>
    //       <MDBBtn className='mx-2' color="info">Clear Cart</MDBBtn>



    //     </form>

    //     <div style={{ marginTop: "15px" }}>
    //       <h3 className='text-center'>Products Added to Cart</h3>
    //       <MDBRow>
    //         <MDBCol size="12">
    //           <MDBTable>
    //             <MDBTableHead dark>
    //               <tr>
    //                 <th scope='col'>NO.</th>
    //                 <th scope='col'>ProductName</th>
    //                 {/* <th scope='col'>Email</th>
    //                 <th scope='col'>Phone</th>
    //                 <th scope='col'>Address</th>
    //                 <th scope='col'>Status</th>
    //                 <th scope='col'>Id</th>
    //                 <th scope='col'>Quantity</th>
    //                 <th scope='col'>Total Price</th> */}


    //               </tr>
    //             </MDBTableHead>
    //             {
    //               cart.length === 0 ? (
    //                 <MDBTableBody>
    //                   <tr>
    //                     <td colSpan={8} className="text-center mb-0">No Data Found</td>
    //                   </tr>
    //                 </MDBTableBody>
    //               ) : (
    //                 //filter((value) => value.product_name !== undefined).
    //                 [cart].map((item, key) => (
    //                   console.log("entered cart : ", item.product_name)



    //                 ))
    //               )
    //             }
    //           </MDBTable>
    //         </MDBCol>
    //       </MDBRow>

    //     </div>

    //   </MDBContainer>
    // )
}
