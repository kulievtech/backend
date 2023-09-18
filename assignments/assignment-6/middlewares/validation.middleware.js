import { validate } from "uuid";

class ValidationMiddleware {
    validateCarIds = (req, res, next) => {
        const { carId } = req.params;

        if (validate(carId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid car ID" });
    };
    validateRentalIds = (req, res, next) => {
        const { rentalId } = req.params;

        if (validate(rentalId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid rental ID" });
    };
    validateMaintenanceIds = (req, res, next) => {
        const { MaintenanceId } = req.params;

        if (validate(MaintenanceId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid maintenance ID" });
    };
}

export const ValidationMiddleware = new ValidationMiddleware();
