import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    occupation: '',
    bio: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/profile');
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setUserData({ ...userData });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    try {
      await axios.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully!');
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  //0.5 0.75
  return (
    <>
      <div className="w-full h-screen poppins bg-cyan-50">
        <Header />
        <div className="shadow-md w-2/3 rounded-lg p-6 mx-auto bg-white mt-5 mobile:w-[90vw] tablet:w-[90vw] laptop:w-2/3 mobile:mt-5 tablet:mt-40 laptop:mt-20">
          <h1 className="text-2xl font-bold text-cyan-800 mb-4 mobile:text-lg tablet:text-2xl laptop:text-2xl">Edit Profile</h1>

          <form onSubmit={handleSave}>
            <div className="flex flex-col gap-4 text-sm mobile:text-xs tablet:text-sm laptop:text-sm">
              <div className="flex gap-4 mobile:flex-col tablet:flex-row laptop:flex-row">
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={userData.fullname}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mobile:flex-col tablet:flex-row laptop:flex-row">
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mobile:flex-col tablet:flex-row laptop:flex-row">
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
                <div className="w-full mobile:w-full tablet:w-1/2 laptop:w-1/2">
                  <label className="block font-medium text-cyan-800">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={userData.occupation}
                    onChange={handleChange}
                    placeholder="Occupation"
                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-cyan-800">Bio</label>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3 mobile:mt-4 tablet:mt-6 laptop:mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-3 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400 mobile:text-xs tablet:text-sm laptop:text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600 mobile:text-xs tablet:text-sm laptop:text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;