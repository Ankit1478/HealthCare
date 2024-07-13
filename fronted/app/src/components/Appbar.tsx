import { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const userToken = localStorage.getItem("token");

    return (
        <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16">
            <Link to="/" className="text-xl font-bold">
                Medium
            </Link>
            <div className="flex gap-4 md:gap-8">
                {userToken ? (
                    <>
                        <Link to="/post">
                            <button
                                type="button"
                                className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12"
                            >
                                <WriteIcon /> Write
                            </button>
                        </Link>
                        <Link to="/geneartiveAi">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Generate With AI
                            </button>
                        </Link>
                        <ProfileBox />
                    </>
                ) : (
                    <div className="border-b border-slate-100 flex justify-between items-center p-3 md:px-16">
                        <div className="flex gap-2 md:gap-1">
                            <div>
                                <Link to="/geneartiveAi">
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                                    >
                                        Generate With AI
                                    </button>
                                </Link>
                            </div>
                            <div className="p-2">
                                <Link
                                    to="/signin"
                                    className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
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

    const getName = localStorage.getItem("name") || "Ankit";
    return (
        <div className="relative cursor-pointer">
            <Avatar name={getName} onClick={() => setShow(!show)} />
            {show && (
                <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-50 border border-gray-100 z-50 w-[160px]">
                    <div className="flex flex-col gap-3">
                        <div onClick={logout}>Logout</div>
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
            className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 hover:bg-gray-50 rounded-full"
        >
            <span className="font-medium text-gray-600">
                {name.split(" ")?.[0]?.[0]}
                {name?.split(" ")?.[1]?.[0]}
            </span>
        </div>
    );
}

const WriteIcon = () => {
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
        </svg>
    );
};

export default WriteIcon;
