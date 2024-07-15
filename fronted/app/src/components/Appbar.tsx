import { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const userToken = localStorage.getItem("token");

    return (
        <div className="border-b border-teal-100 flex justify-between items-center p-4 md:px-16 bg-teal-50">
            <Link to="/" className="text-xl font-bold text-teal-700">
                HealthCare
            </Link>
            <div className="flex gap-4 md:gap-8 items-center">
                {userToken ? (
                    <>
                        <div className="hidden md:flex gap-4">
                            <Link to="/appointment">
                                <button
                                    type="button"
                                    className="focus:outline-none hover:bg-teal-100 focus:ring-4 focus:ring-teal-100 font-medium flex items-center gap-2 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-white border border-teal-300 text-teal-700"
                                >
                                    <AppointmentIcon /> Book Appointment
                                </button>
                            </Link>
                            <Link to="/history">
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Chat summary
                                </button>
                            </Link>
                        </div>
                        <ProfileBox />
                    </>
                ) : (
                    <div className="flex gap-4 md:gap-8">
                        <Link
                            to="/signin"
                            className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                        >
                            Sign In
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

function ProfileBox() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const profileView = () => {
        navigate("/profile");
    };

    const getName = localStorage.getItem("name") || "User";
    return (
        <div className="relative cursor-pointer">
            <Avatar name={getName} onClick={() => setShow(!show)} />
            {show && (
                <div className="absolute top-full right-0 md:right-auto md:left-0 shadow-lg p-1 bg-teal-50 border border-teal-100 z-50 w-[160px]">
                    <div className="flex flex-col gap-3 p-2">
                        <div onClick={logout} className="cursor-pointer text-teal-700">Logout</div>
                        <div onClick={profileView} className="cursor-pointer text-teal-700">Profile</div>
                        <div className="block md:hidden cursor-pointer text-teal-700" onClick={() => navigate("/appointment")}>
                            Book Appointment
                        </div>
                        <div className="block md:hidden cursor-pointer text-teal-700" onClick={() => navigate("/history")}>
                            Chat Summary
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function Avatar({ name, onClick }: { name: string; onClick?: MouseEventHandler<HTMLDivElement> }) {
    return (
        <div
            onClick={onClick}
            className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-teal-200 hover:bg-teal-50 rounded-full"
        >
            <span className="font-medium text-teal-700">
                {name.split(" ")?.[0]?.[0]}
                {name?.split(" ")?.[1]?.[0]}
            </span>
        </div>
    );
}

const AppointmentIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8.5V12m0 0v3.5m0-3.5h3.5m-3.5 0H8.5m-2.67-6.73a9 9 0 1 0 12.34 12.34A9 9 0 0 0 5.83 5.83z"
            />
        </svg>
    );
};
