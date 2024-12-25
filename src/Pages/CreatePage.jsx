import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select';

const CreatePage = () => {
    const [pageData, setPageData] = useState({
        title: '',
        content: '',
        categories: [],
        tags: '',
    });

    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const fetchCurrentUserId = async () => {
        try {
            const response = await axios.get('/current-user');
            setUserId(response.data.userid);
        } catch (error) {
            console.error("Error fetching current user ID:", error);
        }
    };

    useEffect(() => {
        fetchCurrentUserId();
    }, []);

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
        setPageData({ ...pageData, categories: selectedOptions });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPageData({ ...pageData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/posts', {
                ...pageData,
                user: userId,
                categories: pageData.categories.map(option => option.value),
                tags: pageData.tags.split(',').map(tag => tag.trim())
            });
            toast.success('Page created successfully!');
            navigate("/feed");
        } catch (error) {
            console.error("Error creating page:", error);
            toast.error('Failed to create page. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="w-full h-screen poppins bg-white">
                <Header />
                <div className="shadow-md w-2/3 rounded-lg p-6 mx-auto bg-cyan-50 mt-5 mobile:w-[90vw] tablet:w-[90vw] laptop:w-2/3 mobile:mt-28 tablet:mt-40 laptop:mt-14">
                    <h1 className="text-2xl font-bold text-cyan-800 mb-4 mobile:text-lg tablet:text-2xl laptop:text-2xl">Write a Blog</h1>

                    <form onSubmit={handleSave}>
                        <div className="flex flex-col gap-4 text-sm mobile:text-xs tablet:text-sm laptop:text-sm">
                            <div>
                                <label className="block font-medium text-cyan-800">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={pageData.title}
                                    onChange={handleInputChange}
                                    placeholder="Blog Title"
                                    className="p-2 bg-cyan-50 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-cyan-800">Content</label>
                                <textarea
                                    name="content"
                                    value={pageData.content}
                                    onChange={handleInputChange}
                                    placeholder="Blog Content"
                                    className="p-2 bg-cyan-50 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
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
                                    className="basic-multi-select bg-cyan-50"
                                    classNamePrefix="select"
                                    value={pageData.categories}
                                    onChange={handleChange}
                                    placeholder="Select Categories"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-cyan-800">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={pageData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Comma-separated tags"
                                    className="p-2 bg-cyan-50 border border-gray-300 rounded w-full text-cyan-600 focus:outline focus:outline-2 focus:outline-cyan-600"
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
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePage;