import { useState, useEffect } from 'react';
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import SideBar from './SideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser ] = useState({});
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/profile');
                setUser (response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
    }

    // Provide default values for user properties
    const userFullname = user.fullname || 'Guest';
    const userUsername = user.username || 'username'; // Default username
    const userBio = user.bio || 'No bio available'; // Default bio

    return (
        <>
            <header className="flex justify-between items-center py-3 px-6 bg-cyan-400 bg-opacity-40 shadow-lg">
                <div className="text-2xl font-extrabold text-cyan-900 dancingScript">BlogApp</div>
                <div className='flex justify-between items-center w-1/5'>
                    <span className="text-cyan-900 dancingScript text-xl font-extrabold">{userFullname}</span>
                    <FontAwesomeIcon icon={faBell} className='text-cyan-800' />
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-xl text-cyan-800 transition cursor-pointer duration-300 hover:rotate-180"
                        onClick={toggleSidebar}
                    />
                </div>
            </header>
            <SideBar
                isOpen={isOpen}
                onClose={toggleSidebar}
                user={{
                    fullname: userFullname,
                    bio: userBio,
                    username: userUsername
                }}
            />
        </>
    );
};

export default Header;