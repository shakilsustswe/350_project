import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './style/show.module.css';
export default function ShowInvoice() {
    let [total, setTotal] = useState(0);
    let products = useRef();
    const [what, setWhat] = useState(false);
    const { invoice_id } = useParams();
    const [date, setDate] = useState(new Date());
    //const date = "222"

    const [product, setProduct] = useState([]);
    const [productBool, setProductBool] = useState(false);

    useEffect(() => {

        axios
            .get(`http://localhost:5000/product/products`)
            .then((res) => {
                console.log(res);
                console.log("what the hell ?");
                setProduct(res.data.rows);
                setProductBool(true);
            })
        axios.get(`http://localhost:5000/sale-details/details/${invoice_id}`)
            .then((res) => {
                console.log(res.data.result);
                let total1 = 0;
                products.current = res.data.result;
                for (let i = 0; i < res.data.result.length; i++) {
                    total1 += res.data.result[i].total_price;
                }
                setTotal(total1);
                setWhat(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    const handlePrint = (e) => {
        console.log("Clicked");
        window.print();
    }
    return (

        <div style={{ backgroundColor: "", marginLeft: "24vw" }}>
            <section id="printable-area">
                <div>
                    <div style={{ marginLeft: "12vw" }}><h1>Shakil Super Shop</h1></div>
                    <div>
                        <div>
                            <b>Contact Info</b>
                            <p>
                                Address: Shubid Bazar Point<br />
                                Email: nahidswe@gmail.com<br />
                                Phone: 01770210217<br />
                            </p>
                        </div>
                        <div>
                            Invoice Id :
                            {
                                what && products.current[0].invoice_id
                            }
                            <br />

                            Date :
                            {
                                //console.log(date)
                                date.getFullYear()
                            }
                            -
                            {
                                date.getMonth() + 1
                            }
                            -
                            {
                                date.getDate()
                            }

                        </div>
                    </div>
                </div>
                <div className={styles.showinvoice}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Prodcut Description</th>
                                <th>Rate</th>
                                <th>Quantity</th>

                                <th>Price</th>
                                <th>Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {what && products.current.map((e) => (

                                <tr>
                                    <td>
                                        {e.product_description}
                                    </td>
                                    <td>{e.rate}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.total_price}</td>
                                    <td>{e.discount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {what && <p><b>Total Price: {total}</b></p>}
                </div>
            </section>
        </div>
    )
}




