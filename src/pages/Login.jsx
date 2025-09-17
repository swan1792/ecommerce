// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ShopContext } from "../context/ShopContext";
// import { useContext } from "react";


// const Login = () => {
//   const { backendURL, token, setToken, navigate } = useContext(ShopContext)
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isSignup) {
//         // 🔹 Sign Up request
//         const res = await axios.post(`${backendURL}/api/user/register`, {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         });
//         if (res.data.success) {
//           setToken(res.data.token);
//           localStorage.setItem('token', res.data.token);
//         }
//         alert(res.data.message || "Signup successful!");
//       } else {
//         // 🔹 Sign In request
//         const res = await axios.post(`${backendURL}/api/user/login`, {
//           email: formData.email,
//           password: formData.password,
//         });
//         if (res.data.success) {
//           setToken(res.data.token)
//           localStorage.setItem('token', res.data.token);
//           alert(res.data.message || "Signin successful!");
//         }

//         // You can store token in localStorage if backend sends it
//         // localStorage.setItem("token", res.data.token);
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(()=>{
//     if(token){
//       navigate('/')
//     }
//   },[token])

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {isSignup ? "Create an Account" : "Sign In"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isSignup && (
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//           <button
//             onClick={() => setIsSignup(!isSignup)}
//             className="text-blue-600 hover:underline"
//           >
//             {isSignup ? "Sign In" : "Sign Up"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendURL, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate(); // ✅ use navigate hook directly

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // 🔹 Sign Up request
        const res = await axios.post(`${backendURL}/api/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          alert(res.data.message || "Signup successful!");
          navigate("/"); // redirect after signup
        }
      } else {
        // 🔹 Sign In request
        const res = await axios.post(`${backendURL}/api/user/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          alert(res.data.message || "Signin successful!");
          navigate("/"); // redirect after login
        }
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // If user already logged in, redirect
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Create an Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
