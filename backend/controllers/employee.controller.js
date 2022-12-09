const dbConn = require('../config/db.config');
const { uuid } = require('uuidv4');



const Employee = function(employee) {
    this.employee_id  = uuid();
    this.employee_name = employee.employee_name;
    this.employee_email = employee.employee_email;
    this.employee_phone = employee.employee_phone;
    this.employee_pre_address = employee.employee_pre_address;
    this.employee_par_address = employee.employee_par_address;
    this.employee_join_date  = new Date();
    this.employee_status = employee.employee_status;
    //this.employee_end_date = employee.employee_end_date;
    this.employee_designation_id = employee.employee_designation_id;
}

exports.getAllEmployee = (req, res) => {
    console.log('all employee list...');
    dbConn.query('SELECT * FROM tb_employee', (err, result)=>{
        if(err) {
            res.json({ message: 'failed to get employee list', error: err });
        }
        else {
            console.log(result);
            res.json({ message: 'success', result});
        }
    })    

};

exports.getEmployeeById = (req, res) => {
    const id = req.params.id;
    console.log('get a employee by id, id: ' + id);
    dbConn.query('SELECT * FROM tb_employee WHERE employee_id = ?', id, (err, result)=>{
        if(err) {
            res.json({ message: 'failed to get the employeee', error: err });
        }
        else {
            console.log(result);
            res.json({ message: 'success', result});
        }
    });
}

exports.getEmployeeByDesignation = (req, res) => {
    const id = req.params.id;
    console.log('get a employee by id, designation: ' + id);
    dbConn.query('SELECT * FROM tb_employee WHERE employee_designation_id=?', id, (err, result)=>{
        if(err) {
            res.json({ message: 'failed to get the employeee by designation', error: err });
        }
        else {
            console.log(result);
            res.json({ message: 'success', result});
        }
    });
}

//get active employee list
exports.getActiveEmployee = (req, res) => {
    console.log('get active employee by id, designation');
    dbConn.query('SELECT * FROM tb_employee WHERE employee_status=1', (err, result)=>{
        if(err) {
            res.json({ message: 'failed to get active employeees', error: err });
        }
        else {
            console.log(result);
            res.json({ message: 'success', result});
        }
    });
}

//add a new employee
exports.addEmployee = (req, res) => {
    console.log('insert a employee');
    const employeeData = new Employee(req.body);
    console.log(employeeData);
    dbConn.query('INSERT INTO tb_employee SET ?', employeeData, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'failed to add employee', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully added employee' });
        }
    });

};

exports.updateEmployee = (req, res) => {
    const id = req.params.id;
    console.log('update employee...id: ' + id);
    const employeeData = new Employee(req.body);
    const {employee_name, employee_email, employee_phone, employee_pre_address, employee_par_address, employee_designation_id} = req.body;
    console.log(employeeData);
    dbConn.query('UPDATE tb_employee SET employee_name=?, employee_email=?, employee_phone=?, employee_pre_address=?, employee_par_address=?, employee_designation_id=? WHERE employee_id=?', [employee_name, employee_email, employee_phone, employee_pre_address, employee_par_address, employee_designation_id, id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'failed to update employee', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully added employee', result });
        }
    });
};  

//delete employee by id
exports.DeleteEmployee = (req, res) => {
    console.log('delete employee...id: ' + req.params.id);
    const id = req.params.id;
    dbConn.query('UPDATE tb_employee SET employee_status=? WHERE employee_id=?', [0, id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'failed to delete employee', err });
        }
        else {
            console.log(result);
            res.json({ message: 'successfully deleted employee', result });
        }
    });
};  