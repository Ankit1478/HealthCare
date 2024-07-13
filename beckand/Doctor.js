
require('dotenv').config();
const mongoose = require('mongoose');
const { Doctor } = require('./model');

mongoose.connect('mongodb://localhost:27017/patientDashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  const doctors = [
    { name: 'Dr. Smith', specialization: 'Skin' },
    { name: 'Dr. Johnson', specialization: 'Hair' },
    { name: 'Dr. Williams', specialization: 'Dental' },
    { name: 'Dr. Brown', specialization: 'Cardiology' },
    { name: 'Dr. Jones', specialization: 'Neurology' },
    { name: 'Dr. Garcia', specialization: 'Orthopedics' },
    { name: 'Dr. Miller', specialization: 'Pediatrics' },
    { name: 'Dr. Davis', specialization: 'Psychiatry' },
    { name: 'Dr. Rodriguez', specialization: 'Radiology' },
    { name: 'Dr. Martinez', specialization: 'Gastroenterology' },
    { name: 'Dr. Hernandez', specialization: 'Urology' },
    { name: 'Dr. Lopez', specialization: 'Oncology' },
    { name: 'Dr. Gonzalez', specialization: 'Gynecology' },
    { name: 'Dr. Wilson', specialization: 'Endocrinology' },
  ];

  await Doctor.insertMany(doctors);
  console.log('Dummy doctors inserted');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
