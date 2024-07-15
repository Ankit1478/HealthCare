
require('dotenv').config();
const mongoose = require('mongoose');
const { Doctor } = require('./model');

mongoose.connect('mongodb://localhost:27017/patientDashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  const doctors = [
    { name: 'Dr. Smith', specialization: 'Skin' , image:"https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=nSjOQrrbcf6w00lZk7Owo5WfHdMu_WEGuZUh119U4jA=" },
    { name: 'Dr. Janvi', specialization: 'Hair' , image:"https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Williams', specialization: 'Dental' , image:"https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Brown', specialization: 'Cardiology' , image:"https://img.freepik.com/premium-photo/doctor-portrait_1108314-280707.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Sherya', specialization: 'Neurology' , image:"https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Garcia', specialization: 'Orthopedics' ,image:"https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Miller', specialization: 'Pediatrics' , image:"https://img.freepik.com/free-photo/portrait-professional-medical-worker-posing-picture-with-arms-folded_1098-19293.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Davis', specialization: 'Psychiatry' , image:"https://img.freepik.com/premium-photo/doctor-standing-crossed-arm-with-holding-blue-stethoscope-with-blurred-hospital-background_1254992-43101.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Nisha', specialization: 'Radiology' , image:"https://img.freepik.com/free-photo/cinematic-portrait-woman-working-healthcare-system-having-care-job_23-2151237523.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Martinez', specialization: 'Gastroenterology' , image:"https://img.freepik.com/premium-photo/portrait-smiling-doctor-with-stethoscope-corridor-hospital_948103-151.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph" },
    { name: 'Dr. Kushi', specialization: 'Urology' , image:"https://img.freepik.com/free-photo/expressive-young-woman-posing-studio_176474-66963.jpg?w=740&t=st=1721050235~exp=1721050835~hmac=1eddf0269cab9419977812a7990e879333c04f2b63b674454d27015782dcc995"},
    { name: 'Dr. Kirat', specialization: 'Oncology' ,image:"https://img.freepik.com/premium-photo/young-hispanic-man-shrugging-feeling-confused-uncertain-doctor-syringe-concept_1194-284900.jpg?size=626&ext=jpg"},
    { name: 'Dr. Verma', specialization: 'Gynecology' , image:"https://thumbs.dreamstime.com/b/young-doctor-16088825.jpg" },
    { name: 'Dr. Wilson', specialization: 'Endocrinology'  , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UQ8829KMn7WlvyQsnO9ieR2B-uRRVkZbSw&s"},
  ];

  await Doctor.insertMany(doctors);
  console.log('Dummy doctors inserted');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
