const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.get('/employees', employeeController.getAllEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.get('/designation/:id', employeeController.getEmployeeByDesignation);
router.get('/employees/active', employeeController.getActiveEmployee);
router.post('/add-employee', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);
router.put('/delete/:id', employeeController.DeleteEmployee);
module.exports = router;