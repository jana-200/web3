import type { Expense } from "../types/Expense";
import './ExpenseItem.css'

interface ExpenseItemProps {
    expense: Expense;
}

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
    return (
        <div className="expense-item">
            <div>
                <strong>{expense.description}</strong>
            </div>
            <div>Date: {expense.date}</div>
            <div>Payer: {expense.payer}</div>
            <div>Montant: {expense.amount} €</div>
        </div>
    );
};

export default ExpenseItem;