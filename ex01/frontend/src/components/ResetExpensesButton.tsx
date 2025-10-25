import './ResetExpensesButton.css';

interface ExpenseAddProps {
  handleReset: () => void;
}

const ResetExpensesButton = ({ handleReset }: ExpenseAddProps) => {
  return <button className="reset-button" onClick={handleReset}>Reset</button>;
};

export default ResetExpensesButton;
