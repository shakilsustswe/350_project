import React, { useState } from 'react'
import axios from 'axios';


export default function IncomeReport() {
    const [_date, setDate] = useState({});
    const [revenue, setRevenue]=useState(0);
    const [total_purchase, setTotal_purchase]=useState("0");
    const [cost_of_goods, setCost_of_goods]=useState(0);
    const [net_income, setNetIncome] = useState(0);
    const [bool1, setBool1] =useState(false);
    const [bool2, setBool2] =useState(false);
    const [bool3, setBool3] =useState(false);
    const [bool4, setBool4] =useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setDate((__date) => ({ ..._date, [name]: value }));
        //console(date.from);
    }
    //let net_income=0;
    const handleSubmit = (e) => {
        // console.log(_date.from);
        // console.log(_date.to);

        axios
            .get(`http://localhost:5000/sales/report/revenue/?from=${_date.from}&to=${_date.to}`)
            .then((res) => {
                //console.log(res.data.msessage[0].total_amount);
                
                setRevenue(res.data.msessage[0].total_amount);
                if(res.data.msessage[0].total_amount==null)setRevenue(0);
                setBool1(true);
                //console.log(revenue);
            })
            .catch((err) => console.log(err));

            //http://localhost:5000/sales/report/cost-of-good-sold/?from=2022-11-01&to=2022-11-11

            axios
            .get(`http://localhost:5000/sales/report/cost-of-good-sold/?from=${_date.from}&to=${_date.to}`)
            .then((res) => {
                //console.log(res);
                setCost_of_goods(res.data.msessage[0].cost_of_goods);
                if(res.data.msessage[0].cost_of_goods==null)setCost_of_goods(0);
                setBool2(true);
                //console.log(cost_of_goods);
            })
            .catch((err) => console.log(err));

            //http://localhost:5000/orders/total-purchase/?from=2022-07-01&to=2022-07-12
            axios
            .get(`http://localhost:5000/orders/total-purchase/?from=${_date.from}&to=${_date.to}`)
            .then((res) => {
                //console.log(res);
                setTotal_purchase(res.data.msessage[0].total_cost);
                console.log(res.data.msessage[0].total_cost);
                if(res.data.msessage[0].total_cost==null)setTotal_purchase(0);
                setBool3(true);
                //console.log(total_purchase);
            })
            .catch((err) => console.log(err));

            let _net_income=revenue-cost_of_goods;
            console.log("_net_income",_net_income);
            console.log("\n");
            setNetIncome(_net_income);
            setBool4(true);
            console.log("=>" + net_income);
    }

    const income = (x) =>{
       return <div>
            <div><h3> <span style={{color:"black"}}>Revenue : </span>{revenue}</h3></div>
            <div><h3> <span style={{color:"black"}}>Cost of goods sold : </span>{cost_of_goods}</h3> </div>
            <div><h3> <span style={{color:"black"}}>Total purchase : </span>{total_purchase} </h3></div>
            <div><hr size="5" noshade style={{color:"black"}}/></div>
            <div><h3> <span style={{color:"black"}}>Net income : </span>{revenue-cost_of_goods}</h3></div>
        </div>
    }

    return (
        <div style={{width:"40vw", marginLeft:"30vw",  textAlign: "center"}}>
            <div><h3 style={{color: "black"}}>Income Report</h3></div>
            <div>
                <label>From : </label>
                <input type="date" name="from" onChange={handleChange} />
            </div>
            <div>
                <label>To : </label>
                <input type="date" name="to" onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <hr/>
            <div>
                {
                    bool1 && bool2 && bool3 && bool4 && income(2)
                }
            </div>
        </div>
    )
}
