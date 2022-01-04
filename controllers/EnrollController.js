const db = require('../models');
const Course = db.Course;
const Enroll = db.Enroll;
const User = db.User;

exports.getAll = async (req, res) => {
  try {
    const enrolls = await Enroll.findAll();
    const schedule = await getSchedule(enrolls);
    res.json({ success: schedule });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const getSchedule = async (enrolls) => {
  const schedule = await Promise.all(
    enrolls.map(async (enroll) => {
      const user = await User.findByPk(enroll.user_id);
      const course = await Course.findByPk(enroll.course_id);
      return {
        course: course?.title,
        user: user?.email,
        date: enroll?.createdAt,
      };
    })
  );
  return schedule;
};

exports.getById = async (req, res) => {
  try {
    const enroll = await Enroll.findByPk(req.params.id);
    res.json({ success: enroll });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const enroll = new Enroll({
    course_id: req.body.courseId,
    user_id: req.body.userId,
    date: req.body.date,
  });

  try {
    await enroll.save();
    res.json({ success: enroll.id });
  } catch (err) {
    res.json({ error: err.message });
  }
};
