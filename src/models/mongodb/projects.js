const { default: mongoose } = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    propercase: true,
  },
  description: {
    type: String,
    required: true,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks',
    },
  ],

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Projects = new mongoose.model('projects', projectSchema);

module.exports = { Projects };
