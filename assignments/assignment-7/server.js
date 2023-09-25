import { incomesRouter } from "./routes/income.routes.js";
import { expensesRouter } from "./routes/expense.routes.js";
import express from "express";

const app = express();
app.use(express.json());

const PORT = 4080;

app.use("/incomes", incomesRouter);
app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
    console.log("Process is running on ", PORT);
});
