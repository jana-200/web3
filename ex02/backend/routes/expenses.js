const express = require('express');
const router = express.Router();
const { getAllExpenses, addExpense, resetEpenses } = require('../services/expenses.js');


router.get('/', (req, res) => {
  try {
    const expenses = getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
});

router.post('/', (req, res) => {
  try {
    const newExpense = {
      id: Date.now().toString(),
      date: req.body.date,
      description: req.body.description,
      payer: req.body.payer,
      amount: parseFloat(req.body.amount),
    };

    const addedExpense = addExpense(newExpense);
    res.status(201).json(addedExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.post('/reset', (req, res) => {
    try {
      const resetedExpenses = resetEpenses();
      res.json(resetedExpenses);
    } catch (error) {
      console.error('Error resetting expenses:', error);
      res.status(500).json({ error: 'Failed to reset expenses' });
    }
});

module.exports = router;
