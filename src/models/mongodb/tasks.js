const { default: mongoose } = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    propercase: true,
  },
  description: {
    type: String,
    required: true,
  },

  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },

  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects',
  },

  priority: {
    type: String,
    required: true,
    default: 'LOW',
  },

  status: {
    type: String,
    required: true,
    default: 'OPEN',
  },

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

const Tasks = new mongoose.model('tasks', taskSchema);

module.exports = { Tasks };
