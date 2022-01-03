const Venue = require('../models/Venue');

exports.getAll = async (req, res) => {
  try {
    let venues = await Venue.find();
    res.json({ success: venues });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    let venue = await Venue.findById(req.params.id);
    res.json({ success: venue });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getByOwner = async (req, res) => {
  try {
    let venue = await Venue.find({ owner: req.body.owner });
    res.json({ success: venue });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const venue = new Venue({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    price: req.body.price,
    capacity: req.body.capacity,
    owner: req.body.owner,
    thumbnail: req.files[0].filename,
    gallery_1: req.files[1].filename,
    gallery_2: req.files[2].filename,
    lesson: req.files[3].filename,
  });

  try {
    await venue.save();
    res.json({ success: venue._id });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    await venue.remove();
    res.json({ success: 'Venue deleted' });
  } catch (err) {
    res.json({ error: err });
  }
};
