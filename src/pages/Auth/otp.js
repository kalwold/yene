import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { ErrorAlert } from "../../components/ErrorAlert";
export default function OTP() {
  const length = 6;
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const location = useLocation(); 
   const email = location.state?.email;
   const navigate = useNavigate(); 

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      setValues((prev) => {
        const copy = [...prev];
        copy[idx] = "";
        return copy;
      });
      return;
    }
    // If user pastes multiple digits, distribute across inputs
    if (val.length > 1) {
      const chars = val.split("").slice(0, length - idx);
      setValues((prev) => {
        const copy = [...prev];
        for (let i = 0; i < chars.length; i++) copy[idx + i] = chars[i];
        return copy;
      });
      const nextIndex = Math.min(length - 1, idx + val.length);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });

    // move focus
    if (idx < length - 1 && val) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
      setValues((prev) => {
        const copy = [...prev];
        copy[idx - 1] = "";
        return copy;
      });
    }

    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = values.join("");
    if (code.length !== length) {
      setError(`Please enter the ${length}-digit code.`);
      return;
    }
       setLoading(true);
try {
  const response = await axios.post( 
    `${process.env.REACT_APP_API_URL}/users/customer/verify-otp`,
    {
      email: email,
      otp: code,
    }
  );
  navigate("/dashboard");
} catch (error) {
      console.error("otp verification error:", error);

      if (
        error.response &&
        error.response.status !== 500 &&
        error.response.data?.message
      ) {
        setError(error.response.data.message);
      } else if (error.request && !error.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Verificatin failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    setIsResending(true);
    setError("");
    try {
      const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/customer/resend-otp`,
      { email }
    );
       await new Promise((res) => setTimeout(res, 1500));

      setSecondsLeft(30);
       setError("");

    } catch (err) {
         console.error("resend otp error:", err);

      if (
        err.response &&
        err.response.status !== 500 &&
        err.response.data?.message
      ) {
        setError(err.response.data.message);
      } else if (err.request && !err.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Failed to resend code. Try again later.");
      }
      
    } finally {
      setIsResending(false);
    }

  }

  const clearAll = () => {
    setValues(Array(length).fill(""));
    inputsRef.current[0]?.focus();
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  return (
    // <div className="flex h-screen bg-[#ECEFF1] font-sans overflow-hidden">
    //   <div className="w-full  flex justify-center items-center p-8 animate-slideIn">
    //     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl  p-8 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
    //       <div>
    //         <h3 className=" text-xl text-center font-semibold text-gray-800 mb-2">
    //           Verify Your Account
    //         </h3>
    //         <p className="text-sm mb-3"> we have sent OTP to your Email account please enter the otp to verify your account</p>

    //         <form onSubmit={handleSubmit} className="space-y-6">
    //           <div
    //             className="flex gap-3 justify-center"
    //             role="group"
    //             aria-label="OTP input"
    //           >
    //             {values.map((v, i) => (
    //               <input
    //                 key={i}
    //                 ref={(el) => (inputsRef.current[i] = el)}
    //                 inputMode="numeric"
    //                 pattern="[0-9]*"
    //                 maxLength={1}
    //                 value={v}
    //                 onChange={(e) => handleChange(e, i)}
    //                 onKeyDown={(e) => handleKeyDown(e, i)}
    //                 className="w-14 h-16 text-center text-2xl rounded-xl border border-white/40 bg-white/60 text-gray-800 font-bold focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-md transition transform hover:scale-105"
    //                 aria-label={`Digit ${i + 1}`}
    //               />
    //             ))}
    //           </div>

    //           {error && (
    //             <p className="text-sm text-red-200 text-center">{error}</p>
    //           )}

    //           <div className="flex gap-3">
    //             <button
    //               type="submit"
    //               className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow-lg hover:opacity-90 focus:ring-4 focus:ring-pink-300 transition"
    //                onClick={handleSubmit}
    //             >
    //               Verify
    //             </button>
    //             <button
    //               type="button"
    //               onClick={clearAll}
    //               className="px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-gray-800 shadow hover:bg-white/70"
    //             >
    //               Clear
    //             </button>
    //           </div>

    //           <div className="flex items-center justify-between text-sm text-white/90">
    //             <button
    //               type="button"
    //               onClick={handleResend}
    //               disabled={secondsLeft > 0 || isResending}
    //               className="underline disabled:opacity-50 hover:text-white"
    //             >
    //               {isResending
    //                 ? "Resending..."
    //                 : secondsLeft > 0
    //                 ? `Resend in ${secondsLeft}s`
    //                 : "Resend code"}
    //             </button>

    //             <button
    //               type="button"
    //               onClick={() => inputsRef.current[0]?.focus()}
    //               className="text-xs hover:text-white"
    //             >
    //               Need help?
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //        {loading && <Loading />} 
    //     </div>
    //   </div>
    // </div>
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans overflow-hidden">
      <div className="w-full flex justify-center items-center p-4 animate-fadeIn">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 relative">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Account
            </h3>
            <p className="text-sm text-gray-600">
              We've sent a 6-digit OTP to your email. Enter it below to verify.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div
              className="flex gap-2 justify-center"
              role="group"
              aria-label="OTP input fields"
            >
              {values.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition-all duration-200 hover:scale-105"
                  aria-label={`OTP digit ${i + 1}`}
                  required
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
                <ErrorAlert
                          message={error}
                        /> 
          
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-700 font-medium shadow hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Enhanced Resend OTP Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Didn't receive the code?</span>
       
            </div>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={handleResend}
                disabled={secondsLeft > 0 || isResending}
                className="flex-1 py-2 px-4 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Resend OTP via email"
              >
                {isResending ? (
                  <>
                    <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resending...
                  </>
                ) : secondsLeft > 0 ? (
                  `Resend in ${secondsLeft}s`
                ) : (
                  <>
                    📧 Resend via Email
                  </>
                )}
              </button>

            </div>
            {/* Countdown Progress Bar */}
        {secondsLeft > 0 && (
    <div className="w-full px-1"> {/* Added padding to prevent edge overflow */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"> {/* Ensured overflow-hidden on the bar itself */}
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${(secondsLeft / 30) * 100}%` }}
        ></div>
      </div>
    </div>
  )}
          </div>

          {/* Back Button */}
          <div className="mt-4 text-center">
            <button
              type="button"
             // onClick={() => window.history.back()} // Or your navigation logic
               onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              ← Back to Login
            </button>
          </div>

          {/* Loading Overlay */}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}
