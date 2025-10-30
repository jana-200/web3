import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseSorter from "../components/ExpenseSorter";
import type { Expense } from "../types/Expense";

const host = import.meta.env.VITE_API_URL;

export default function List() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sortingAlgo, setSortingAlgo] = useState<(_a: Expense, _b: Expense) => number>(() => () => 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${host}/api/expenses`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetExpenses = async () => {
    try {
      setLoading(true);
      setExpenses([]);
      const res = await fetch(`${host}/api/expenses/reset`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setExpenses(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Expenses List ({expenses.length})</h1>
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-between items-center mb-4">
        {expenses.length > 0 && <ExpenseSorter setSortingAlgo={setSortingAlgo} />}
        <button
          onClick={resetExpenses}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset Data
        </button>
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Description</th>
            <th className="p-2">Payer</th>
            <th className="p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
