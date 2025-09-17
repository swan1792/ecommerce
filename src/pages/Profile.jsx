import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // token from login
        const res = await axios.get(`${backendURL}/api/user/profile`, {
          headers: { token }, // matches your authUser middleware
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">User ID:</span> {user._id}</p>
      </div>
    </div>
  );
};

export default Profile;
