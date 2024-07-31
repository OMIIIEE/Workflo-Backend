const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'under review', 'completed'],
    required: true,
    default: 'to-do'
  },
  
  priority: {
    type: String,
    enum: ['urgent', 'medium', 'low'],
    required: true
  },
  deadline: { type: Date},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);

