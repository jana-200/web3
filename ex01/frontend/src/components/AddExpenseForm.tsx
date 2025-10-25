import React, { useState } from "react";
import type { NewExpense } from "../types/Expense";
import './AddExpenseForm.css'

interface AddExpenseProps {
    onExpenseAdded: (expense: NewExpense) => void;
}

const AddExpenseForm = ({onExpenseAdded}: AddExpenseProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [payer, setPayer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExpenseAdded({
      description,
      amount: amount === "" ? 0 : amount,
      payer,
      date: new Date().toISOString().split('T')[0],
    });
      
  };

   return (
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label>description</label>
            <input
              value={description}
              type="text"
              onChange={(e)=> setDescription(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Payer</label>
            <input
              value={payer}
              type="text"
              onChange={(e)=> setPayer(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Amount</label>
            <input
              value={amount ?? ""}
              type="number"
              min={1}
              onChange={(e)=> setAmount(parseInt(e.target.value))}
              required
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
};

export default AddExpenseForm;
