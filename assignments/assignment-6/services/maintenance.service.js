import { maintenances } from "../data.js";

class MaintenanceService {
    getAllMaintenances() {
        let filteredMaintenances = Object.values(maintenances);
        return filteredMaintenances;
    }

    getMaintenanceById(maintenanceId) {
        return maintenances[maintenanceId];
    }

    createAMaintenance(data) {
        const id = uuid();

        const maintenance = {
            id,
            ...data
        };
        maintenances[id] = maintenance;
        return maintenance;
    }

    updateMaintenance(maintenanceId, data) {
        const maintenance = maintenances[maintenanceId];

        if (maintenance) {
            maintenances[maintenanceId] = {
                ...maintenances[maintenanceId],
                ...data
            };
            return maintenances[maintenanceId];
        } else {
            return "Error";
        }
    }

    deleteMaintenance(maintenanceId) {
        delete maintenances[maintenanceId];
    }
}

export const maintenanceService = new MaintenanceService();
