require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// require('./seeds/seed.js');

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const courseRoutes= require('./routes/course');
app.use('/api/course', courseRoutes);

const enrollRoutes= require('./routes/enroll');
app.use('/api/enroll', enrollRoutes);

const transactionRoutes= require('./routes/transaction');
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Serving...'));
