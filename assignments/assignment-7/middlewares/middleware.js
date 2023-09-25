import { validate } from "uuid";
import { incomesService } from "../services/income.service.js";
import { expensesService } from "../services/expense.service.js";

class ValidationMiddleware {
    validateIncomeId(req, res, next) {
        const income = incomesService.readFile();
        const result = income.then(() => {
            const { incomeId } = req.params;
            if (validate(incomeId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid income ID" });
        });
        return result;
    }

    validateExpenseId(req, res, next) {
        const expense = expensesService.readFile();
        const result = expense.then(() => {
            const { expenseId } = req.params;
            if (validate(expenseId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid expense ID" });
        });
        return result;
    }
}

export const validationMiddleware = new ValidationMiddleware();
