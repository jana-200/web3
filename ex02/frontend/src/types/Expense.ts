export interface Expense {
  id: number;
  date: string;
  description: string;
  payer: string;
  amount: number;
}

export interface NewExpense {
    description: string;
    amount: number;
    payer: string;
    date: string;
}
