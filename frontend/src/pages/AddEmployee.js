import React, { useState } from 'react'
import axios from 'axios';

//import './style/addemployee.css'

export default function AddEmployee() {
    const [employee, setEmployee] = useState({});

    const handleChange = (e) => {
        //console.log(e.target.value);
        const { name, value } = e.target;
        setEmployee((employee) => ({ ...employee, [name]: value }));
    }

    const handleSubmit = (e) => {
       e.preventDefault();

        employee.employee_status="1";
        //employee.employee_end_date="0000-00-00";
        //console.log("submitted");
        //console.log(employee);

        axios
            .post("http://localhost:5000/employee/add-employee", employee)
            .then((res) => {
                //console.log(res.data);
                alert(employee.employee_name + " is added as a new Epmployee.");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="testbox" style={{ marginLeft: "25vw", marginTop: "2vh", backgroundColor: "ActiveBorder", width: "35vw" }}>
            <form action="/action_page.php" onSubmit={handleSubmit}>
                <div class="btn-block">
                    <h3 style={{}}>Enter Employee Details</h3>
                </div>

                <div className="level" style={{ marginTop: "40px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Full_Name</h6></level>
                    </div>
                    <input className='employee_name' type="text" name="employee_name" onChange={handleChange} />
                </div>

                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Email</h6></level>
                    </div>
                    <input className='employee_email' type="text" name="employee_email" onChange={handleChange} />
                </div>

                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Phone_no</h6></level>
                    </div>
                    <input className='employee_phone' type="text" name="employee_phone" onChange={handleChange} />
                </div>

                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Present_Address</h6></level>
                    </div>
                    <input className='employee_pre_address' type="text" name="employee_pre_address" onChange={handleChange} />
                </div>

                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Parmanent_Address</h6></level>
                    </div>
                    <input className='employee_par_address' type="text" name="employee_par_address" onChange={handleChange} />
                </div>


                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Designation</h6></level>
                    </div>
                    <select name="employee_designation_id" onChange={handleChange}>
                        <option value='0'>Designition</option>
                        <option value='1'>Manager</option>
                        <option value='2'>Salesman</option>
                    </select>

                </div>

                <div className="level" style={{ marginTop: "10px" }}>
                    <div style={{ margin: "4px", marginRight: "10px" }}>
                        <level><h6>Join Date</h6></level>
                    </div>
                    <input className='employee_join_date' type="date" name="employee_join_date" onChange={handleChange} />
                </div>

                <div class="btn-block">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
