import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserPosts from '../Components/UserPosts';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/profile', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    navigate('/editProfile');
  };

  const handleWriteBlog = () => {
    navigate('/create');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen poppins bg-white">
      <Header />
      <div className="shadow-md w-2/3 mx-auto mobile:w-[90vw] tablet:w-2/3 laptop:w-2/3 rounded-lg p-6 mobile:mx-auto tablet:mx-auto laptop:mx-auto bg-cyan-50 mt-5">
        <div className="flex items-start w-full justify-between">
          <div className='flex justify-between items-start w-full py-3'>
            <div>
              <h1 className="text-3xl mobile:text-2xl tablet:text-2xl laptop:text-3xl font-bold text-cyan-900">{user.fullname}</h1>
              <p className="text-cyan-700 mobile:text-xs tablet:text-sm laptop:text-sm">@{user.username}</p>
            </div>
            <FontAwesomeIcon icon={faPencil} className='text-cyan-500 hover:text-cyan-700' onClick={handleEdit} />
          </div>
        </div>
        <p className="text-cyan-700 mt-2 text-base mobile:text-sm tablet:text-base laptop:text-base">{user.bio}</p>
        <div className="mt-4 flex gap-4">
          <button onClick={handleWriteBlog} className="bg-cyan-500 hover:bg-cyan-700 text-white text-sm mobile:text-xs laptop:text-sm tablet:text-sm py-2 px-3 rounded-full">
            Write a Blog
          </button>
        </div>
      </div>
      <UserPosts />
    </div>
  );
};

export default Profile;