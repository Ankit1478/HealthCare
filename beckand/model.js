const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  linkedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
});

const interactionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  query: { type: String, required: true },
  response: { type: String, required: true },
  interactionDate: { type: Date, default: Date.now, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = { Patient, Doctor, Interaction };
