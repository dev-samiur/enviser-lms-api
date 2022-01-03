require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

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
