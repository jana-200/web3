
const fs = require('fs');
const path = require('path');
const EXPENSES = path.join(__dirname, '../data/expenses.json');
const init_expenses = path.join(__dirname, '../data/expenses.init.json');


function getAllExpenses() {
  const data = fs.readFileSync(EXPENSES, 'utf8');
  return JSON.parse(data);
}


function addExpense(expense) {
  const expenses = getAllExpenses();
  expense.id=expenses.length+1;
  expenses.push(expense);


  const updatedExpenses = JSON.stringify(expenses, null, 2);
  fs.writeFileSync(EXPENSES, updatedExpenses);
  return expense;
}

function resetEpenses() {
    const initData= fs.readFileSync(init_expenses, 'utf8');
    fs.writeFileSync(EXPENSES, initData);
    return JSON.parse(initData);
}


module.exports = {
    getAllExpenses,
    addExpense,
    resetEpenses
};