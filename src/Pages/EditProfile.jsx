import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";

const EditProfile = () => {
  const navigate = useNavigate();

  const initialUserData = {
    name: "Sayantan Halder",
    username: "sayantan_h",
    profilePhoto: "https://via.placeholder.com/150",
    bio: "Web Developer | Tech Enthusiast | Blogger",
    email: "sayantan@example.com",
    phone: "123-456-7890",
    dob: "1990-01-01",
    occupation: "Web Developer",
  };

  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Saved data:", userData);
    navigate('/profile'); 
  };

  const handleCancel = () => {
    navigate('/profile'); 
  };

  return (
    <div className="w-full h-screen poppins bg-cyan-50 poppins ">
      <Header />
      <div className="shadow-md w-2/3 rounded-lg p-6 translate-x-1/4 bg-white mt-5">
        <h1 className="text-2xl font-bold text-cyan-800 mb-4">Edit Profile</h1>

        <div className="flex justify-center mb-4">
          <img
            src={userData.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-cyan-800">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={userData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-800">Bio</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="p-2 border border-gray-300 rounded w-full text-cyan-600"
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCancel}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;