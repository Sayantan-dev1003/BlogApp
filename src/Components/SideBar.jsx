import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

const SideBar = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); 

    const logout = async () => {
        try {
            await fetch('/logout', { method: 'GET', credentials: 'include' });
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navigateTo = (path) => {
        navigate(path); 
        onClose(); 
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex flex-col justify-between items-center h-full" onClick={onClose}></div>
            )}
            <div
                className={`fixed top-0 right-0 w-1/4 h-full dancingScript bg-cyan-950 text-white transform transition-transform flex flex-col justify-between duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-3xl font-bold dancingScript">BlogApp</h2>
                    <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex items-center p-4">
                    <div>
                        <div className="text-2xl font-semibold">Sayantan Halder</div>
                        <div className="text-base">Sayantan Halder</div>
                    </div>
                </div>
                <div className="px-1 text-lg">
                    <ul>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/feed')}>Home</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/profile')}>Profile</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/categories')}>Categories</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/create')}>Write a Blog</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/saved')}>Saved Posts</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/notifications')}>Notifications</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/settings')}>Settings</li>
                        <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={logout}>Logout</li>
                    </ul>
                </div>
                <div className="flex flex-col justify-between p-4 border-t border-gray-700">
                    <div className="flex flex-col">
                        <div className="text-center text-lg font-bold tracking-wide mt-auto">BlogApp</div>
                        <div className="text-center text-xs font-thin poppins">© BlogApp 2024 All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;