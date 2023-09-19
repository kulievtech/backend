import { employeeService } from "../services/employee.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { EMPLOYEE_FIELDS } from "../const/allowedFields.js";

class EmployeeController {
    getAllEmployees = (req, res) => {
        const employees = employeeService.getAllEmployees();
        res.status(200).json({ data: employees });
    };
    getAnEmployeeById = (req, res) => {
        const employeeId = req.params.employeeId;
        const employee = employeeService.getAnEmployeeById(employeeId);

        res.status(200).json({ data: employee });
    };
    addAnEmployee = (req, res) => {
        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);

        const employee = employeeService.addAnEmployeeACar(data);
        res.status(201).json({ data: employee });
    };
    updateAnEmployee = (req, res) => {
        const employeeId = req.params.employeeId;

        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);
        const employee = employeeService.updateAnEmployee(employeeId, data);

        if (employee === "Error") {
            res.status(404).json({
                message: "Employee with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: employee });
    };
    deleteAnEmployee = (req, res) => {
        const employeeId = req.params.employeeId;
        const employee = employeeService.deleteAnEmployee(employeeId);
        res.status(204).send();
    };
}

export const employeeController = new EmployeeController();
