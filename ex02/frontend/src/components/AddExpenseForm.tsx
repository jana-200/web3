import { useForm, type SubmitHandler } from "react-hook-form";
import type { NewExpense } from "../types/Expense";
import './AddExpenseForm.css';

interface AddExpenseProps {
  onExpenseAdded: (expense: NewExpense) => void;
}

interface FormInputs {
  description: string;
  payer: string;
  amount: number;
}

const AddExpenseForm = ({ onExpenseAdded }: AddExpenseProps) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newExpense: NewExpense = {
      ...data,
      date: new Date().toISOString().split("T")[0],
    };

    onExpenseAdded(newExpense);
    reset();
  };

  return (
    <div className="add-expense-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field-group">
          <label>Description</label>
          <input {...register("description", { required: true })} />
        </div>

        <div className="field-group">
          <label>Payer</label>
          <input {...register("payer", { required: true })} />
        </div>

        <div className="field-group">
          <label>Montant</label>
          <input
            type="number"
            min={1}
            step={0.01}
            {...register("amount", { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="button-group">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
