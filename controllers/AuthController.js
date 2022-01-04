const db = require("../models")
const User = db.User
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ error: 'Invalid login details' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ error: 'Invalid login details' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({
      success: {
        token,
        userId: user.id,
        username: user.username,
        email: user.email,
        type: user.user_type,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
};

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    user_type: req.body.userType,
  });
  try {
    await user.save();
    res.json({ success: 'User registration successful' });
  } catch (err) {
    res.json({ error: err });
  }
};
