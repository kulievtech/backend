import { Router } from "express";

import { rentalController } from "../controllers/rental.controller.js";

import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.get(
    "/:rentalId",
    ValidationMiddleware.validateRentalIds,
    rentalController.getRentalById
);
rentalRouter.post("/", rentalController.createARental);
rentalRouter.put(
    "/:rentalId",
    ValidationMiddleware.validateRentalIds,
    rentalController.updateRental
);
rentalRouter.delete(
    "/:rentalId",
    ValidationMiddleware.validateRentalIds,
    rentalController.deleteRental
);

export { rentalRouter };
