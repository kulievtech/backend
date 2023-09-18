import { Router } from "express";

import { carController } from "../controllers/car.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.get(
    "/:carId",
    ValidationMiddleware.validateCarIds,
    carController.getCarById
);
carRouter.post("/", carController.createACar);
carRouter.put(
    "/:carId",
    ValidationMiddleware.validateCarIds,
    carController.updateCar
);
carRouter.delete(
    "/:carId",
    ValidationMiddleware.validateCarIds,
    carController.deleteCar
);

export { carRouter };
