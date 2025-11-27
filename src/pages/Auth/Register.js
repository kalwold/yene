import { useState } from "react";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorAlert } from "../../components/ErrorAlert";

export default function Register() {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false); 
   const [firstName, setFirstName] = useState(""); 
   const [lastName, setLastName] = useState(""); 
   const [email, setEmail] = useState(""); 
   const [mobile, setMobile] = useState("");
   const [password, setPassword] = useState(""); 
   const [password2, setPassword2] = useState(""); 
    const [error, setError] = useState(""); 
    const [formErrors, setFormErrors] = useState({});


     const validateForm = () => {
    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      newErrors.firstName = "Name should contain only letters.";
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      newErrors.lastName = "Name should contain only letters.";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email format";
    } 


    if (!mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Invalid mobile format";
    } else if (!/^0(9|7)/.test(mobile)) {
      newErrors.mobile = "phone number must start with 09 or 07.";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } 
    if (!password2) {
      newErrors.password2 = "Please confirm your password";
    } else  if (password !== password2) {
      newErrors.password2 = "Passwords do not match";
   }

    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
if (validateForm()) {
       setLoading(true);

     try {
      const response = await axios.post(  
        `${process.env.REACT_APP_API_URL}/users/customer/register`,
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            password: password

        }
      );
      navigate("/otp",  {
        state: { email: email }});
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.response &&
        error.response.status !== 500 &&
        error.response.data?.message
      ) {
        setError(error.response.data.message);
      } else if (error.request && !error.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }

  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10 font-sans">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 transition-all">
        <div className="text-center">
          <img
            src={logo}
            alt="Laundry Portal Logo"
            className="mx-auto h-16 mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create an Account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Fresh clothes, happy life ✨
          </p>
        </div>

          {error && (
           <ErrorAlert
          message={formErrors}
        /> 
          )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
             {formErrors.firstName && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.firstName} /> </p>}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formErrors.lastName && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.lastName} /> </p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formErrors.email && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.email} /> </p>}
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formErrors.mobile && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.mobile} /> </p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formErrors.password && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.password} /> </p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formErrors.password2 && <p className="text-red-500 text-sm"><ErrorAlert message={formErrors.password2} /> </p>}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
