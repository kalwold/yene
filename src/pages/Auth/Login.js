import React, { useState, useEffect, useMemo, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import im1 from "../../assets/1.jpg";
import im2 from "../../assets/2.jpg";
import im3 from "../../assets/3.jpg";
import im4 from "../../assets/4.jpg";
import im5 from "../../assets/5.jpg";
import im6 from "../../assets/6.jpg";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
   const navigate = useNavigate();
   const { login } = useContext(AuthContext); 

  const images = useMemo(() => [im1, im2, im3, im4, im5, im6], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
   
    try {
      const response = await axios.post( 
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          username: email,
          password: password,
        }
      );

      // Extract the token from the response
      const authToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      const userData = {
        userId: response.data.userId,
        username: response.data.username,
        firstName: response.data.firstName,
        roles: response.data.roles,
        branchName: response.data.branchName,
        newUser: response.data.newUser,
        passwordChanged: response.data.passwordChanged,
        active: response.data.active,
        permissions: response.data.permissions,
      };
      login(authToken, refreshToken, userData);
      console.log(userData);
console.log(response.data.roles);
 
  if (response.data.roles === 'laundryadmin' && response.data.newUser) {
        navigate('/laundryadmin/setup');
      } else if (response.data.roles ==='System') {
        navigate('/admin/dashboard');
      } else {
        navigate(`/${response.data.roles}/dashboard`);
      }
      
    } catch (error) {
      console.error("Login failed:", error);

      if (
        error.response &&
        error.response.status !== 500 &&
        error.response.data?.message
      ) {
        setError(error.response.data.message);
      } else if (error.request && !error.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex h-screen bg-[#ECEFF1] font-sans overflow-hidden">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 animate-slideIn">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="Laundry Portal Logo"
              className="mx-auto h-16"
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-3">
              Welcome Back!
            </h2>
            <p className="text-gray-500 text-sm"> Fresh clothes, happy life ✨ </p>
          </div>

          {error && (
            <div className=" text-red-700 p-2 mb-3 text-sm text-center animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative group">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-3001 ${
                  error ? "border-red-500" : ""
                }`}
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-3001 ${
                  error ? "border-red-500" : ""
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-sm text-blue-500 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
             // onClick={() => navigate("/dashboard")}
             onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              Login
            </button>

            {/* Extra links */}
            <div className="text-center mt-4 text-sm">
              {/*                 
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a> */}
              <button
                type="button"
                onClick={() => console.log("Forgot password clicked")}
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
              <span className="mx-2 text-gray-400">|</span>
              {/* <a href="#" className="text-blue-500 hover:underline">
                Create account
              </a> */}

              <button
                type="button"
                //onClick={() => console.log("create account clicked")}
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/register")}
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side Rotating Images */}
      <div className="hidden md:flex w-1/2 relative">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="bg-blue-900 bg-opacity-40 w-full flex justify-center items-center">
          <h2 className="text-white text-3xl font-bold px-8 text-center drop-shadow-lg animate-fadeIn">
            Your clothes deserve the best care 💧
          </h2>
        </div>
      </div>
    </div>
    
  );
}
