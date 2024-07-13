// import axios from "axios";
// import { ChangeEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export const Auth = ({ type }: { type: "signup" | "signin" }) => {
//     const [postInput, setPostInput] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const [emailError, setEmailError] = useState("");
//     const navigate = useNavigate();

//     const validateEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     async function sendRequest() {
//         if (!validateEmail(postInput.email)) {
//             setEmailError("Please enter a valid email address.");
//             return;
//         }
//         try {
//             const res = await axios.post(``, postInput);
//             const token = res.data.token;
//             const id = res.data.user.id;
//             const userName = res.data.user.name;
//             if (jwt) {
//                 localStorage.setItem("token", jwt);
//                 localStorage.setItem("user", id);
//                 localStorage.setItem("name", userName);

//                 navigate("/dashboard ");
//             } else {
//                 console.error("No token received in response");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     return (
//         <div className="h-screen flex justify-center flex-col">
//             <div className="flex justify-center">
//                 <div>
//                     <div className="px-10">
//                         <div className="text-3xl font-bold">
//                             Create an account
//                         </div>
//                         <div className="text-slate-400">
//                             {type === "signin" ? "Don't have an account" : "Already have an account?"}
//                             <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>
//                                 {type === "signup" ? "Sign in" : "Sign up"}
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="pt-5">
//                         <LabelInput
//                             label="Name"
//                             placeholder="Name"
//                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                 setPostInput((currentInput) => ({
//                                     ...currentInput,
//                                     name: e.target.value
//                                 }));
//                             }}
//                         />
//                         <div className="pt-2">
//                             <LabelInput
//                                 label="Email"
//                                 placeholder="ankit@gmail.com"
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     setPostInput((currentInput) => ({
//                                         ...currentInput,
//                                         email: e.target.value
//                                     }));
//                                     setEmailError("");
//                                 }}
//                                 type="email"
//                             />
//                             {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
//                         </div>
//                         <div className="pt-2">
//                             <LabelInput
//                                 label="Password"
//                                 type="password"
//                                 placeholder="password"
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     setPostInput((currentInput) => ({
//                                         ...currentInput,
//                                         password: e.target.value
//                                     }));
//                                 }}
//                             />
//                         </div>
//                         <div className="pt-5">
//                             <button
//                                 type="button"
//                                 className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
//                                 onClick={sendRequest}
//                             >
//                                 {type === "signup" ? "Sign up" : "Sign in"}
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// interface LabelInputType {
//     label: string;
//     placeholder: string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     type?: string;
// }

// export const LabelInput = ({ label, placeholder, onChange, type = "text" }: LabelInputType) => {
//     return (
//         <div>
//             <label className="block mb-2 text-sm text-gray-900 dark:text-black font-bold">{label}</label>
//             <input
//                 onChange={onChange}
//                 type={type}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 placeholder={placeholder}
//                 required
//             />
//         </div>
//     );
// };