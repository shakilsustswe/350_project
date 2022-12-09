import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ViewEmployee() {

  const [employee, setEmployee] = useState([]);
  const [employeeBool, setEmployeeBool] = useState(false);
  useEffect(() => {
    //http://localhost:5000/employee/add-employee
    axios
      .get("http://localhost:5000/employee/employees")
      .then((response) => {
        setEmployee(response.data.result);
        setEmployeeBool(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th><h5>Serial No</h5></th>
            <th><h5>Employee Name</h5></th>
            <th><h5>Designation</h5></th>
            <th><h5>Address</h5></th>
            <th><h5>Phone Number</h5></th>
            <th><h5>Email Address</h5></th>
            <th><h5>Joining Date</h5></th>
          </tr>
        </thead>

        <tbody>
          {
            employeeBool && employee.map((e, index) => {
              if(e.employee_designation_id==="1")e.employee_designation_id="Manager";
              else if(e.employee_designation_id=="2")e.employee_designation_id="Salesman";
              if(e.employee_status==="1"){
                return <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.employee_name}</td>
                <td>{e.employee_designation_id}</td>
                <td>{e.employee_pre_address}</td>
                <td>{e.employee_phone}</td>
                <td>{e.employee_email}</td>
                <td>{e.employee_join_date}</td>
              </tr>
              }
            }
            )
          }
        </tbody>
      </table>
    </div>
  )
}
