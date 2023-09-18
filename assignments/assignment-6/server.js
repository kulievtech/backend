import express from "express";
import { carRouter } from "./routes/car.routes.js";
import { maintenanceRouter } from "./routes/maintenance.route.js";
import { rentalRouter } from "./routes/rental.route.js";

const app = express();
app.use(express.json());

const PORT = 4040;

app.use("/cars", carRouter);
app.use("/maintenances", maintenanceRouter);
app.use("/rentals", rentalRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
