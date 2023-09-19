import { express } from "express";
import { employeeRouter } from "./routes/employee.route.js";

const app = express();
app.use(express.json());

const PORT = 6060;

app.use("/employees", employeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
