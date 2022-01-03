const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
  course_id: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Enroll', enrollSchema, 'enrolls');
