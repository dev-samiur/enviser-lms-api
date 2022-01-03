const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  gallery_1: {
    type: String,
    required: true,
  },
  gallery_2: {
    type: String,
    required: true,
  },
  lesson: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Venue', venueSchema, 'venues');
