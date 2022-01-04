const db = require('../models');
const Course = db.Course;
const Enroll = db.Enroll;
const Transaction = db.Transaction;

exports.getAll = async (req, res) => {
  try {
    let courses = await Course.findAll();
    res.json({ success: courses });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    let course = await Course.findByPk(req.params.id);
    res.json({ success: course });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getByOwner = async (req, res) => {
  try {
    let course = await Course.findAll({ where: { owner: req.body.owner } });
    res.json({ success: course });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    owner: req.body.owner,
    thumbnail: req.files[0].filename,
    gallery_1: req.files[1].filename,
    gallery_2: req.files[2].filename,
    lesson: req.files[3].filename,
  });

  try {
    await course.save();
    res.json({ success: course.id });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const transactions = await Transaction.findAll({
      where: { course_id: course.id },
    });
    const enrolls = await Enroll.findAll({ where: { course_id: course.id } });
    const enrollIds = enrolls.map((enroll) => enroll.id);
    const transactionIds = transactions.map((transaction) => transaction.id);

    Enroll.destroy({ where: { id: [...enrollIds] } });
    Transaction.destroy({ where: { id: [...transactionIds] } });
    await course.destroy();
    res.json({ success: 'Course deleted' });
  } catch (err) {
    res.json({ error: err });
  }
};
