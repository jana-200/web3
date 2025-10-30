import { useState } from "react";
import type { ExpenseInput } from "../types/Expense";

const host = import.meta.env.VITE_API_URL;

export default function Add() {
  const [form, setForm] = useState<ExpenseInput>({
    description: "",
    payer: "",
    amount: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setForm({ description: "", payer: "", amount: 0 });
      setError(null);
      alert("Expense added!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Add Expense</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Payer</label>
          <input
            name="payer"
            placeholder="Payer"
            value={form.payer}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
