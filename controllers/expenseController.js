const expenses = require('../models/expenseModel');

exports.getExpenses = (req, res) => {
    const userExpenses = expenses.filter(expense => expense.userId === req.user.id);
    res.json(userExpenses);
};

exports.addExpense = (req, res) => {
    const { description, amount } = req.body;
    const newExpense = {
        id: expenses.length + 1,
        userId: req.user.id,
        description,
        amount
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
};

exports.updateExpense = (req, res) => {
    const { id } = req.params;
    const { description, amount } = req.body;
    const expense = expenses.find(exp => exp.id == id && exp.userId === req.user.id);

    if (!expense) return res.status(404).send('Expense not found');

    expense.description = description;
    expense.amount = amount;
    res.json(expense);
};

exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    const expenseIndex = expenses.findIndex(exp => exp.id == id && exp.userId === req.user.id);

    if (expenseIndex === -1) return res.status(404).send('Expense not found');

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
};

exports.calculateTotalExpense = (req, res) => {
    const userExpenses = expenses.filter(expense => expense.userId === req.user.id);
    const totalExpense = userExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    res.json({ totalExpense });
};
