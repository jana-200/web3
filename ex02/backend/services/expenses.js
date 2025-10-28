const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const init_expenses = path.join(__dirname, '../data/expenses.init.json');

/**
 * Récupère toutes les dépenses depuis la DB
 */
async function getAllExpenses() {
  const expenses = await prisma.expense.findMany();
  return expenses.map(exp => ({
    ...exp,
    date: exp.date.toISOString()
  }));
}

/**
 * Ajoute une dépense dans la DB
 */
async function addExpense(expense) {
  const newExpense = await prisma.expense.create({
    data: {
      date: new Date(expense.date),
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount,
    },
  });
  return newExpense;
}

/**
 * Reset : supprime toutes les dépenses et remet les valeurs initiales
 */
async function resetExpenses() {
  await prisma.expense.deleteMany();

  const initData = JSON.parse(fs.readFileSync(init_expenses, 'utf8'));

  for (const exp of initData) {
    const { id, date = new Date(exp.date), ...rest } = exp;
    await prisma.expense.create({ data: rest });
  }

  return initData.map(({ id, ...rest }, index) => ({ id: index + 1, ...rest }));
}


module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
