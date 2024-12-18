import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import EditPicture from '../Components/EditPicture';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEditPictureOpen, setEditPictureOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/profile', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('fullname', userData.fullname);
    formData.append('username', userData.username);
    formData.append('bio', userData.bio);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('dob', userData.dob);
    formData.append('occupation', userData.occupation);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    await axios.put('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });

    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleEditPicture = (file) => {
    setProfilePic(file);
    setEditPictureOpen(false);
  };

  return (
    <>
      <div className="w-full h-screen poppins bg-cyan-50">
        <Header />
        <div className="shadow-md w-2/3 rounded-lg p-6 translate-x-1/4 bg-white mt-5">
          <h1 className="text-2xl font-bold text-cyan-800 mb-4">Edit Profile</h1>

          <div className="flex justify-center mb-4">
            <img
              src={userData.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full cursor-pointer"
              onClick={() => setEditPictureOpen(true)}
            />
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-cyan-800">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={userData.fullname}
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

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={handleCancel}
              className="py-2 px-3 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="py-2 px-3 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
            >
              Save
            </button>
          </div>
        </div>

        <EditPicture
          isOpen={isEditPictureOpen}
          onClose={() => setEditPictureOpen(false)}
          profilePhoto={userData.profilePic || "https://via.placeholder.com/150"}
          onEdit={handleEditPicture}
        />
      </div >
    </>
  );
};

export default EditProfile;