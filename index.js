const express = require('express');
const bodyParser = require('body-parser');
const { handleError } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handling middleware
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
