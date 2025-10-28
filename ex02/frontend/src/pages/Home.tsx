import React, { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense, NewExpense } from "../types/Expense";
import AddExpenseButton from "../components/AddExpenseButton";
import ResetExpensesButton from "../components/ResetExpensesButton";
import AddExpenseForm from "../components/AddExpenseForm";

const Home: React.FC = () => {
  const host = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Récupération initiale des dépenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${host}/expenses`);
        const data = await response.json();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  // 🔹 Ajout d’une dépense
  const handleAdd = async (newExpense: NewExpense) => {
    try {
      const response = await fetch(`${host}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) throw new Error("Failed to add expense");
      const addedExpense = await response.json();
      setExpenses((prev) => [...prev, addedExpense]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // 🔹 Reset des dépenses
  const handleReset = async () => {
    try {
      const response = await fetch(`${host}/expenses/reset`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to reset expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error resetting expenses:", error);
    }
  };

  return (
    <div>
      <h2>Mes dépenses</h2>

      <ul className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>

      <ResetExpensesButton handleReset={handleReset} />

      {showForm ? (
        <AddExpenseForm
          onExpenseAdded={handleAdd}
        />
      ) : (
        <AddExpenseButton onClick={() => setShowForm(true)} />
      )}

    </div>
  );
};

export default Home;
