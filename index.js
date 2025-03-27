const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Function to validate input numbers
const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return { error: 'Invalid input. Please provide valid numbers.' };
    }
    return null;
};

// Addition endpoint
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json(error);
    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ operation: 'addition', result });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json(error);
    const result = parseFloat(num1) - parseFloat(num2);
    res.json({ operation: 'subtraction', result });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json(error);
    const result = parseFloat(num1) * parseFloat(num2);
    res.json({ operation: 'multiplication', result });
});

// Division endpoint
app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json(error);
    if (parseFloat(num2) === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    res.json({ operation: 'division', result });
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator microservice is running on http://localhost:${port}`);
});
