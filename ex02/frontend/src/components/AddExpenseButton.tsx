import './AddExpenseButton.css';

interface ExpenseAddProps {
  onClick: () => void; 
}

const AddExpenseButton = ({ onClick }: ExpenseAddProps) => {
  return <button className="fab" onClick={onClick}>+</button>;
};

export default AddExpenseButton;
