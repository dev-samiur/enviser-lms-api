const Course = require('../models/Course');

exports.getAll = async (req, res) => {
  try {
    let courses = await Course.find();
    res.json({ success: courses });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    res.json({ success: course });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getByOwner = async (req, res) => {
  try {
    let course = await Course.find({ owner: req.body.owner });
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
    res.json({ success: course._id });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    await course.remove();
    res.json({ success: 'Course deleted' });
  } catch (err) {
    res.json({ error: err });
  }
};
