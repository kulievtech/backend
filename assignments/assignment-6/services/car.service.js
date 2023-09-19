import { cars } from "../data.js";
import { v4 as uuid } from "uuid";

class CarService {
    getAllCars() {
        let filteredCars = Object.values(cars);
        return filteredCars;
    }

    getCarById(carId) {
        return cars[carId];
    }

    createACar(data) {
        const id = uuid();
        const car = {
            id,
            ...data
        };
        cars[id] = car;
        return car;
    }

    updateCar(carId, data) {
        const car = cars[carId];

        if (car) {
            cars[carId] = { ...cars[carId], ...data };
            return cars[carId];
        } else {
            return "Error";
        }
    }

    deleteCar(carId) {
        delete cars[carId];
    }
}

export const carService = new CarService();
