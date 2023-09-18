import { rentalService } from "../services/rental.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { RENTAL_FIELDS } from "../const/allowedFields.js";

class RentalController {
    getAllRentals = (req, res) => {
        const rentals = rentalService.getAllRentals();
        res.status(200).json({ data: rentals });
    };

    getRentalById = (req, res) => {
        const rentalId = req.params.rentalId;
        const rental = rentalService.getRentalById(rentalId);
        res.status(200).json({ data: rental });
    };

    createARental = (req, res) => {
        const data = sanitizedObj(RENTAL_FIELDS, req.body);

        const rental = rentalService.createARental(data);

        res.status(201).json({ data: rental });
    };

    updateRental = (req, res) => {
        const rentalId = req.params.rentalId;
        const data = sanitizedObj(RENTAL_FIELDS, req.body);
        const rental = rentalService.updateRental(rentalId, data);

        if (rental === "Error") {
            res.status(404).json({
                message: "Rental with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: rental });
    };

    deleteRental = (req, res) => {
        const rentalId = req.params.rentalId;
        const rental = rentalService.deleteRental(rentalId);
        res.status(204).send();
    };
}

export const rentalController = new RentalController();
