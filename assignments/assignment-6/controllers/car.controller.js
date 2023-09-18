import { carService } from "../services/car.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { CAR_FIELDS } from "../const/allowedFields.js";

class CarController {
    getAllCars = (req, res) => {
        const cars = carService.getAllCars();
        res.status(200).json({ data: cars });
    };

    getCarById = (req, res) => {
        const carId = req.params.carId;
        const car = carService.getCarById(carId);
        res.status(200).json({ data: car });
    };

    createACar = (req, res) => {
        const data = sanitizedObj(CAR_FIELDS, req.body);

        const car = carService.createACar(data);
        res.status(201).json({ data: car });
    };

    updateCar = (req, res) => {
        const carId = req.params.carId;

        const data = sanitizedObj(CAR_FIELDS, req.body);
        const car = carService.updateCar(carId, data);

        if (car === "Error") {
            res.status(404).json({
                message: "Car with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: car });
    };

    deleteCar = (req, res) => {
        const carId = req.params.carId;
        const car = carService.deleteCar(carId);
        res.status(204).send();
    };
}

export const carController = new CarController();
