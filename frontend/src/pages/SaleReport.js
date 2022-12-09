import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function SaleReport() {

    const [_date, setDate] = useState({});
    const [bool1, setBool1] = useState(false);
    const [salesReport, setSalesReport] = useState([]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setDate((__date) => ({ ..._date, [name]: value }));
        //console(date.from);
    }

    //http://localhost:5000/sales/show-sales-details/date/?from=2022-11-20&to=2022-11-30
    //http://localhost:5000/sale-details/?from=${_date.from}&to=${_date.to}

    const handleSubmit = (e) => {
        axios
            .get(`http://localhost:5000/sales/show-sales-details/date/?from=${_date.from}&to=${_date.to}`)
            .then((res) => {

                //console.log(res.data.rows);
                console.log(res.data);
                setSalesReport(res.data);
                setBool1(true);
            })
            .catch((err) => console.log(err));
    }

    const income = (x) => {

        console.log(salesReport);
        // return <div>
        //      <div>Revenue : {revenue}</div>
        //      <div>Cost of goods : {cost_of_goods} </div>
        //      <div>Total purchase : {total_purchase} </div>
        //      <div>Net income : {net_income}</div>
        //  </div>
    }


    return (
        <div>
            <div><h3>Sale Report</h3></div>
            <div>
                <label>From : </label>
                <input type="date" name="from" onChange={handleChange} />
            </div>
            <div>
                <label>To : </label>
                <input type="date" name="to" onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <hr />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th><h5>Serial</h5></th>
                            <th><h5>Date</h5></th>
                            <th><h5>Product Name</h5></th>
                            <th><h5>Quantity</h5></th>
                            <th><h5>Rate</h5></th>
                            <th><h5>Discount(%)</h5></th>
                            <th><h5>Total Price</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bool1 && salesReport.map((e, index) => {
                                return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{e.invoice_date}</td>
                                    <td>{e.product_description}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.rate}</td>
                                    <td>{e.discount}</td>
                                    <td>{e.total_price}</td>
                                </tr>
                            })
                        }
                    </tbody> 
                </table>
            </div>
        </div>
    )
}
