const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  course_id: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	method: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');
