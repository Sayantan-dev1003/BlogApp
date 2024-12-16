import { useState } from 'react';
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from './SideBar'; // Import the SideBar component

const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="flex justify-between items-center py-3 px-6 bg-cyan-400 bg-opacity-40 shadow-lg poppins">
                <div className="text-2xl font-extrabold text-cyan-900 dancingScript">BlogApp</div>
                <div className='flex justify-between items-center w-1/5'>
                    <div className="flex items-center">
                        <img
                            src="profile-photo.jpg" 
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-2 bg-white"
                        />
                        <span className="text-cyan-900 dancingScript text-xl font-extrabold">Sayantan Halder</span>
                    </div>
                    <FontAwesomeIcon icon={faBell} className='text-cyan-800' />
                    <FontAwesomeIcon 
                        icon={faBars} 
                        className="text-xl text-cyan-800 transition cursor-pointer duration-300 hover:rotate-180" 
                        onClick={toggleSidebar} // Toggle sidebar on click
                    />
                </div>
            </header>
            <SideBar isOpen={isOpen} onClose={toggleSidebar} user={{ profilePhoto: "profile-photo.jpg", name: "Sayantan Halder", bio: "Your bio here" }} />
        </>
    );
};

export default Header;