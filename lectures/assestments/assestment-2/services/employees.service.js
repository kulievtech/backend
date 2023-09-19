// import { employees } from "../employees.json";

import { v4 as uuid } from "uuid";
import fs from "fs";
const employeesData = require("../employees.json");

class EmployeeService {
    readParseAll() {
        const content = fs.readFileSync(employeesData, "utf-8");

        const parsedData = JSON.parse(content);

        const employees = parsedData.employees; // array
        return employees;
    }

    updateAll(data) {
        fs.writeFileSync(employeesData, JSON.stringify(data));
    }

    getAllEmployees() {
        const content = this.readParseAll(); // array

        return content;
    }
    getAnEmployeeById(employeeId) {
        const content = this.readParseAll();

        for (const employee of content) {
            return employee[employeeId];
        }
    }

    addAnEmployee(data) {
        const content = this.readParseAll(); // array
        const id = uuid();

        const employee = { id, ...data };

        content.push(employee);

        this.updateAll(content);

        return employee;
    }
    updateAnEmployee(employeeId, data) {
        const content = this.readParseAll(); // array

        for (const employee of content) {
            if (employee[employeeId]) {
                employee[employeeId] = { ...employee[employeeId], ...data };
                return employee[employeeId];
            } else {
                return "Error";
            }
        }
        this.updateAll(content);
    }
    deleteAnEmployee(employeeId) {
        const content = this.readParseAll(); // array

        content = content.filter((employee) => employee.id !== employeeId);
        return content;
    }
}

export const employeeService = new employeeService();
