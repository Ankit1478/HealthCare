
import 'tailwindcss/tailwind.css';
import { Appbar } from './Appbar';
import Chat from '../page/Chat';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDoctorDetails } from '../hooks/useDcotordetails';


const MedicalTemplate: React.FC = () => {
    const { doctors, loading } = useDoctorDetails();
    const navigate = useNavigate();


    const handleImageClick = (id: string) => {
        navigate(`/doctor/${id}`);
    };

    return (
        <div className="relative min-h-screen bg-[#f0fdfa]">
            <Appbar />
            <div>
                <div className="slider-area2">
                    <div className="slider-height2 flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-500 py-20">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-white">Doctors</h2>
                        </div>
                    </div>
                </div>
                <div className="team-area section-padding30 py-10">
                    <div className="container mx-auto">
                        <div className="text-center mb-10">
                            <span className="text-teal-500">Our Doctors</span>
                            <h2 className="text-3xl font-bold">Our Specialist</h2>
                        </div>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <ClipLoader color={"#36d7b7"} loading={loading} size={50} />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <Chat />
                                {doctors.map((doctor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
                                        onClick={() => handleImageClick(doctor._id)}
                                    >
                                        <div className="flex flex-col items-center p-4">
                                            <img src={doctor.image} alt={doctor.name} className="h-64 w-full object-cover rounded-t-lg" />
                                            <div className="p-4 text-center">
                                                <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                                                <span className="text-gray-600">{doctor.specialization}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer className="bg-gray-800 py-10 text-white text-center">
                <p>&copy; {new Date().getFullYear()} HealthCare. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default MedicalTemplate;
