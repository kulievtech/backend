import { Router } from "express";

import { employeeController } from "../controllers/employees.controller.js";

import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const employeeRouter = new Router();

employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.getAnEmployeeById
);
employeeRouter.post("/", employeeController.addAnEmployee);
employeeRouter.put(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.updateAnEmployee
);
employeeRouter.delete(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.deleteAnEmployee
);

export { employeeRouter };
