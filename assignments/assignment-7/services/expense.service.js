import { v4 as uuid } from "uuid";
import fs from "fs";

class ExpensesService {
    readFile() {
        const data = fs.promises.readFile("expenses.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.expenses;
        });
        return dataObj;
    }
    writeFile(data) {
        return fs.promises.writeFile("expenses.json", JSON.stringify(data));
    }
    getAllExpenses() {
        return this.readFile();
    }

    getExpenseById(expenseId) {
        const expenses = this.readFile();
        const result = expenses.then((data) => {
            return data[expenseId];
        });
        return result;
    }
    createExpense(data) {
        const expenses = this.readFile();

        return expenses.then((expensesObj) => {
            const id = uuid();

            const newExpense = {
                id,
                ...data
            };

            expensesObj[id] = newExpense;

            return this.writeFile({ expenses: expensesObj }).then(
                () => newExpense
            );
        });
    }
    updateExpenseById(expenseId, data) {
        const expenses = this.readFile();
        return expenses.then((expensesObj) => {
            if (expensesObj.hasOwnProperty(expenseId)) {
                const updatedExpense = {
                    ...expensesObj[expenseId],
                    ...data
                };
                expensesObj[expenseId] = updatedExpense;
                return this.writeFile({ expenses: expensesObj }).then(
                    () => updatedExpense
                );
            } else {
                return "Error";
            }
        });
    }
    deleteExpenseById(expenseId) {
        const expenses = this.readFile();
        return expenses.then((expensesObj) => {
            if (expensesObj.hasOwnProperty(expenseId)) {
                delete expensesObj[expenseId];
                return this.writeFile({ expenses: expensesObj }).then(() => {
                    return "An expense was deleted";
                });
            } else {
                return "Error";
            }
        });
    }
}

export const expensesService = new ExpensesService();
