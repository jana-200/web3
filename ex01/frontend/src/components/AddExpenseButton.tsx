import type { Expense } from '../types/Expense';
import './AddExpenseButton.css';

interface ExpenseAddProps {
  handleAdd: (newExpense: Expense) => void;
}

const AddExpenseButton = ({ handleAdd }: ExpenseAddProps) => {
  const onAdd = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      payer: Math.random() < 0.5 ? "Alice" : "Bob",
      description: "Nouvelle dépense",
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat((Math.random() * 100).toFixed(2)),
    };

    handleAdd(newExpense);
  };

  return <button className="fab" onClick={onAdd}>+</button>;
};

export default AddExpenseButton;
