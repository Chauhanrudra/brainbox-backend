const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true },
  resources: [{
    type: { type: String, enum: ['pdf', 'bibtex', 'link', 'video'], required: true },
    url: { type: String, required: true },
    duration: { type: Number } // Duration in minutes
  }],
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // Additional fields as needed
});

module.exports = mongoose.model('Course', CourseSchema);
