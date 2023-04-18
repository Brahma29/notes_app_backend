const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

//Importing Routes
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes

app.use('/', (req, res) => {
  res.send('API running...');
});

app.use('/api/notes', notesRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 8000;

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
