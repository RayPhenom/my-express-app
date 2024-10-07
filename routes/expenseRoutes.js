const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense, calculateTotalExpense } = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getExpenses);
router.post('/', authenticateToken, addExpense);
router.put('/:id', authenticateToken, updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);
router.get('/total', authenticateToken, calculateTotalExpense);

module.exports = router;
