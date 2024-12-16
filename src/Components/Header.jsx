import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <header className="flex justify-between items-center py-3 px-6 bg-cyan-400 bg-opacity-40 shadow-lg poppins">
            <div className="text-2xl font-extrabold text-cyan-900 dancingScript">BlogApp</div>
            <div className='flex justify-between items-center w-1/5'>
                <div className="flex items-center">
                    <img
                        src="profile-photo.jpg" 
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 bg-white"
                    />
                    <span className="text-cyan-900">Sayantan Halder</span>
                </div>
                <FontAwesomeIcon icon={faBars} className="text-xl transition cursor-pointer duration-300 hover:rotate-180" />
            </div>
        </header>
    );
};

export default Header;