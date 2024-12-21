import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser ] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/profile', {
        method: 'GET',
        credentials: 'include' 
      });
      if (response.ok) {
        const data = await response.json();
        setUser (data);
      } else {
        console.error("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    navigate('/editProfile');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen poppins bg-cyan-50">
      <Header />
      <div className="shadow-md w-2/3 rounded-lg p-6 translate-x-1/4 bg-white mt-5">
        <div className="flex items-start w-full justify-between">
          <img
            src={user.profilePic}
            alt="Profile "
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
          <div className="w-[80%] py-3">
            <div className='flex justify-between items-start w-full'>
              <div>
                <h1 className="text-3xl font-bold text-cyan-900">{user.fullname}</h1>
                <p className="text-cyan-700 text-sm">@{user.username}</p>
              </div>
              <FontAwesomeIcon icon={faPencil} className='text-cyan-500 hover:text-cyan-700' onClick={handleEdit} />
            </div>
            <div className="mt-6 flex gap-4 text-xs">
              <div className="flex gap-1">
                <h3>{user.followers || 0}</h3>
                <p className="text-cyan-800 font-medium">Followers</p>
              </div>
              <div className="flex gap-1">
                <h3>{user.following || 0}</h3>
                <p className="text-cyan-800 font-medium">Following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-cyan-900">Bio</h2>
          <p className="text-cyan-700">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;