const EditPicture = ({ isOpen, onClose, profilePic, onEdit }) => {
    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onEdit(file);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text -lg font-bold text-cyan-800 mb-4">Edit Profile Picture</h2>
                <div className="flex flex-col items-center mb-4">
                    <img src={profilePic} alt="Profile" className="w-64 h-64 rounded-full mb-4" />
                    <input type="file" onChange={handleFileChange} className="mb-4" />
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onEdit}
                        className="py-2 px-3 bg-cyan-500 text-white rounded text-xs font-medium hover:bg-cyan-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="py-2 px-3 bg-gray-300 text-gray-800 rounded text-xs font-medium hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPicture;