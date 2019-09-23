const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// allow us to get data in req.body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/list', require('./routes/api/list'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
