require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { Patient, Doctor, Interaction } = require('./model');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/patientDashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


const formatGeneratedText = (text) => {
  return text
    .replace(/##+/g, '')  // Remove Markdown headers
    .replace(/\*\*/g, '')  // Remove bold formatting
    .replace(/\*/g, '')  // Remove italic formatting
    .replace(/- /g, '- ')  // Ensure proper formatting for lists
    .replace(/(\d\.)/g, '\n$1')  // Add line breaks before numbered lists
    .replace(/\n+/g, ' ')  // Replace multiple line breaks with a single space
    .trim();  // Remove leading and trailing whitespace
};

const generateContent = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const text = response.data.candidates[0].content.parts[0].text;
    return formatGeneratedText(text);
  } catch (error) {
    console.error("Error generating content:", error);
    return "";
  }
};


const saveInteraction = async (patientId, doctorId, query, response) => {
  const interaction = new Interaction({
    patientId,
    doctorId,
    query,
    response,
    interactionDate: new Date(),
  });
  await interaction.save();
};

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

const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];
app.get('/specializations', (req, res) => {
    res.json(specializations);
});


app.post('/signup', async (req, res) => {
  const { name, email, password, age, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({ name, email, password: hashedPassword, age, gender });
    await patient.save();
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.get('/profile', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

app.get('/interactions', auth, async (req, res) => {
  try {
    const interactions = await Interaction.find({ patientId: req.patient.id }).populate('doctorId');
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interactions', error });
  }
});

app.post('/chat', auth, async (req, res) => {
  const { specialization, query } = req.body;
  try {
    const doctor = await Doctor.findOne({ specialization });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const response = await generateContent(query);
    await saveInteraction(req.patient.id, doctor._id, query, response);
    res.json({ response });
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).send('Error handling chat');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3001');
});
