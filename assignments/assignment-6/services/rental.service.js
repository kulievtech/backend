import { rentals } from "../data.js";

class RentalService {
    getAllRentals() {
        let filteredRentals = Object.values(rentals);
        return filteredRentals;
    }

    getRentalById(rentalId) {
        return rentals[rentalId];
    }

    createARental(data) {
        const id = uuid();

        const rental = {
            id,
            ...data
        };
        rentals[id] = rental;
        return rental;
    }

    updateRental(rentalId, data) {
        const rental = rentals[rentalId];

        if (rental) {
            rentals[rentalId] = { ...rentals[rentalId], ...data };
            return rentals[rentalId];
        } else {
            return "Error";
        }
    }

    deleteRental(rentalId) {
        delete rentals[rentalId];
    }
}

export const rentalService = new RentalService();
