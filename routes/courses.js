const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create Course
router.post('/', async (req, res) => {
  const { title, instructor, key, resources } = req.body;
  try {
    const newCourse = new Course({ title, instructor, key, resources });
    await newCourse.save();
    res.status(201).json({ message: 'Course created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Student to Course
router.post('/:courseId/addStudent', async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }
    res.json({ message: 'Student added to course' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
