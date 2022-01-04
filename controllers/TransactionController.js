const db = require('../models');
const Course = db.Course;
const Transaction = db.Transaction;

exports.getAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json({ success: transactions });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const courses = await Course.findAll({ where: { owner: req.params.id } });
    const transactions = await Transaction.findAll();
    const filteredVenues = courses.map((course) => course._id.toString());
    filteredTransactions = [];
    transactions.forEach((transaction) => {
      const exist = filteredVenues.includes(transaction.course_id);
      if (exist) filteredTransactions.push(transaction);
    });
    res.json({ success: filteredTransactions });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const transaction = new Transaction({
    course_id: req.body.courseId,
    user_id: req.body.userId,
    method: req.body.method,
    date: req.body.date,
  });

  try {
    await transaction.save();
    res.json({ success: transaction._id });
  } catch (err) {
    res.json({ error: err.message });
  }
};
