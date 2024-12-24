import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await fetch('/logout', { method: 'POST', credentials: 'include' });
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navigateTo = (path) => {
        navigate(path);
        onClose();
    };

    const userFullname = user?.fullname || 'Guest';
    const userUsername = user?.username || 'username';
    const userBio = user?.bio || 'No bio available';

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex flex-col justify-between items-center h-full"
                    onClick={onClose}
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 w-1/4 laptop:w-1/4 mobile:w-3/4 tablet:w-1/2 h-full dancingScript bg-cyan-950 text-white transform transition-transform flex flex-col justify-between duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h2 className="text-3xl laptop:text-3xl mobile:text-2xl tablet:text-3xl font-bold dancingScript">BlogApp</h2>
                        <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" onClick={onClose} />
                    </div>
                    <div className="flex flex-col gap-3 items-start p-4">
                        <div>
                            <div className="text-2xl laptop:text-2xl mobile:text-xl tablet:text-2xl font-semibold">{userFullname}</div>
                            <div className="text-xs laptop:text-xs mobile:text-xs tablet:text-xs font-light">@{userUsername}</div>
                        </div>
                        <div className="text-base laptop:text-base mobile:text-base tablet:text-base">{userBio}</div>
                    </div>
                    <div className="px-1 text-lg laptop:text-lg mobile:text-lg tablet:text-xl mt-3">
                        <ul>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/feed')}>Home</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/profile')}>Profile</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/create')}>Write a Blog</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/saved')}>Saved Posts</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/notifications')}>Notifications</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={() => navigateTo('/settings')}>Settings</li>
                            <li className="py-2 px-4 tracking-wide hover:bg-cyan-800 cursor-pointer rounded-md" onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-between p-4 border-t border-gray-700">
                    <div className="flex flex-col">
                        <div className="text-center text-lg laptop:text-lg mobile:text-base tablet:text-lg font-bold tracking-wide mt-auto">BlogApp</div>
                        <div className="text-center text-xs laptop:text-sm mobile:text-xs tablet:text-sm font-thin poppins">© BlogApp 2024 All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </>
    );
};

SideBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        fullname: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
    }),
};

SideBar.defaultProps = {
    user: {
        fullname: 'Guest',
        username: 'username',
        bio: 'No bio available',
    },
};

export default SideBar;