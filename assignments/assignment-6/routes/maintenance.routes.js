import { Router } from "express";

import { maintenanceController } from "../controllers/maintenance.controller.js";

import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController.getAllMaintenances);
maintenanceRouter.get(
    "/:maintenanceId",
    ValidationMiddleware.validateMaintenanceIds,
    maintenanceController.getMaintenanceById
);
maintenanceRouter.post("/", maintenanceController.createAMaintenance);
maintenanceRouter.put(
    "/:maintenanceId",
    ValidationMiddleware.validateMaintenanceIds,
    maintenanceController.updateMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    ValidationMiddleware.validateMaintenanceIds,
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
