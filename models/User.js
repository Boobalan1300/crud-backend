
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  birthday: String,
  gender: String,
  password: String,
  image: String,
});

const User = mongoose.model('CRUD', userSchema);

module.exports = User;
