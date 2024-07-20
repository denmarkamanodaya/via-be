const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    propercase: true,
  },
  last_name: {
    type: String,
    required: true,
    propercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: Date,
});

const Users = new mongoose.model('users', userSchema);

module.exports = { Users };
