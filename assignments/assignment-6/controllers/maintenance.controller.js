import { maintenanceService } from "../services/rental.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { MAINTENANCE_FIELDS } from "../const/allowedFields.js";

class MaintenanceController {
    getAllMaintenances = (req, res) => {
        const maintenances = maintenanceService.getAllMaintenances();
        res.status(200).json({ data: maintenances });
    };

    getMaintenanceById = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        const maintenance =
            maintenanceService.getMaintenanceById(maintenanceId);
        res.status(200).json({ data: maintenance });
    };

    createAMaintenance = (req, res) => {
        const data = sanitizedObj(MAINTENANCE_FIELDS, req.body);

        const maintenance = maintenanceService.createAMaintenance(data);

        res.status(201).json({ data: maintenance });
    };

    updateMaintenance = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        const data = sanitizedObj(MAINTENANCE_FIELDS, req.body);
        const maintenance = maintenanceService.updateMaintenance(
            maintenanceId,
            data
        );

        if (maintenance === "Error") {
            res.status(404).json({
                message: "Maintenance with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: maintenance });
    };

    deleteMaintenance = (req, res) => {
        const rentalId = req.params.rentalId;
        const rental = rentalService.deleteRental(rentalId);
        res.status(204).send();
    };
}

export const maintenanceController = new MaintenanceController();
