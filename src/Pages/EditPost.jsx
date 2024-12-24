import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Components/Header";
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select';

const EditPost = () => {
    const { postId } = useParams(); // Get post ID from URL parameters
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        categories: [],
        tags: '',
    });

    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    // Fetch current user ID from the server
    const fetchCurrentUserId = async () => {
        try {
            const response = await axios.get('/currentUser'); // Removed extra space
            setUserId(response.data.userid); // Set the user ID from the response
        } catch (error) {
            console.error("Error fetching current user ID:", error);
        }
    };

    // Fetch post data by ID
    const fetchPostData = async () => {
        try {
            const response = await axios.get(`/posts/${postId}`);
            setPostData({
                title: response.data.title,
                content: response.data.content,
                categories: response.data.categories.map(category => ({ value: category, label: category })),
                tags: response.data.tags.join(', '),
            });
        } catch (error) {
            console.error("Error fetching post data:", error);
        }
    };

    useEffect(() => {
        fetchCurrentUserId(); // Call the function on component mount
        fetchPostData(); // Fetch post data
    }, [postId]);

    const categoryOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Health and Wellness', label: 'Health and Wellness' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Food and Recipes', label: 'Food and Recipes' },
        { value: 'Personal Development', label: 'Personal Development' },
        { value: 'Business and Entrepreneurship', label: 'Business and Entrepreneurship' },
        { value: 'Finance and Investing', label: 'Finance and Investing' },
        { value: 'Education and Learning', label: 'Education and Learning' },
        { value: 'Fitness and Exercise', label: 'Fitness and Exercise' },
        { value: 'Fashion and Beauty', label: 'Fashion and Beauty' },
        { value: 'Parenting and Family', label: 'Parenting and Family' },
        { value: 'Art and Design', label: 'Art and Design' },
        { value: 'Photography', label: 'Photography' },
        { value: 'Home and Garden', label: 'Home and Garden' },
        { value: 'DIY and Crafts', label: 'DIY and Crafts' },
        { value: 'Science and Research', label: 'Science and Research' },
        { value: 'Automotive', label: 'Automotive' },
        { value: 'Gaming', label: 'Gaming' },
        { value: 'Politics and Current Events', label: 'Politics and Current Events' },
        { value: 'History and Culture', label: 'History and Culture' },
        { value: 'Spirituality and Mindfulness', label: 'Spirituality and Mindfulness' },
        { value: 'Music and Entertainment', label: 'Music and Entertainment' },
        { value: 'Environmental Issues', label: 'Environmental Issues' },
        { value: 'Career and Job Advice', label: 'Career and Job Advice' },
    ];

    const handleChange = (selectedOptions) => {
        setPostData({ ...postData, categories: selectedOptions });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/${postId}`, {
                ...postData,
                user: userId,
                categories: postData.categories.map(option => option.value),
                tags: postData.tags.split(',').map(tag => tag.trim())
            });
            toast.success('Post updated successfully!');
            navigate("/feed");
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error('Failed to update post. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="w-full h-screen poppins bg-cyan-50">
                <Header />
                <div className="shadow-md w-2/3 rounded-lg p-6 mx-auto bg-white mt-5 mobile:w-[90vw] tablet:w-[90vw] laptop:w-2/3 mobile:mt-28 tablet:mt-40 laptop:mt-14">
                    <h1 className="text-2xl font-bold text-cyan-800 mb-4 mobile:text-lg tablet:text-2xl laptop:text-2xl">Edit Blog</h1>

                    <form onSubmit={handleUpdate}>
                        <div className="flex flex-col gap-4 text-sm mobile:text-xs tablet:text-sm laptop:text-sm">
                            <div>
                                <label className="block font-medium text-cyan-800">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={postData.title}
                                    onChange={handleInputChange}
                                    placeholder="Blog Title"
                                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-cyan-800">Content</label>
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    placeholder="Blog Content"
                                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                                    rows="5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-cyan-800">Categories</label>
                                <Select
                                    isMulti
                                    name="categories"
                                    options={categoryOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={postData.categories}
                                    onChange={handleChange}
                                    placeholder="Select Categories"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-cyan-800">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={postData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Comma-separated tags"
                                    className="p-2 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPost;