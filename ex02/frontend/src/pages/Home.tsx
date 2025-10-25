import React, { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import AddExpenseButton from "../components/AddExpenseButton";
import ResetExpensesButton from "../components/ResetExpensesButton";


const Home: React.FC = () => {
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${host}/expenses`);
        const data = await response.json();
        console.log("Fetched expenses:", data);
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }  
    };

    fetchExpenses();
  }, []);

  const handleAdd = async (newExpense: Expense) => {
    setExpenses(prev => [...prev, newExpense]);
    try{ 
      const response =  await fetch(`${host}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const addedExpense = await response.json();
      setExpenses(prev => [...prev, addedExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  const handleReset = async () => {
    try {
      const response = await fetch(`${host}/expenses/reset`, {
        method: "POST",
      });
      const data=await response.json();
      console.log("Reset expenses:", data);
      if (!response.ok) {
        throw new Error("Failed to reset expenses");
      }

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

      <AddExpenseButton handleAdd={handleAdd} />
      <ResetExpensesButton handleReset={handleReset} />
    </div>
    
  );
};

export default Home;
