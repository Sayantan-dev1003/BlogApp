import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisV, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch('/posts', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch user posts");
      }
    };
    fetchUserPosts();
  }, []);

  const toggleDropdown = (postId) => {
    setDropdownVisible(dropdownVisible === postId ? null : postId);
  };

  const deletePost = async (postId) => {
    const response = await fetch(`/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok) {
      setPosts(posts.filter(post => post._id !== postId));
    } else {
      console.error("Failed to delete post");
    }
  };

  return (
    <div className="w-full mt-5">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="shadow-md w-2/3 mx-auto mobile:w-[90vw] tablet:w-2/3 laptop:w-2/3 rounded-lg p-6 bg-white mb-4 flex flex-col items-start justify-between relative">
            <div className="w-full border-b-2 border-gray-200 pb-1 mb-4">
              <div className='flex justify-between items-center'>
                <h2 className="text-2xl mobile:text-xl tablet:text-2xl laptop:text-2xl dancingScript font-semibold text-cyan-900">{post.title}</h2>
                <FontAwesomeIcon icon={faEllipsisV} className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer" onClick={() => toggleDropdown(post._id)} />
                {dropdownVisible === post._id && (
                  <div className="absolute top-2 right-4 mt-10 bg-white shadow-lg rounded-md">
                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FontAwesomeIcon icon={faPencil} className='text-gray-700' />&nbsp;&nbsp;Edit</p>
                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => deletePost(post._id)}>
                      <FontAwesomeIcon icon={faTrash} className='text-gray-700' />&nbsp;&nbsp;Delete
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-2 mb-6">
                <p className="text-sm mobile:text-[0.78rem] mobile:leading-[0.72rem] laptop:text-sm tablet:text-sm text-gray-500">Posted by {post.user.fullname}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.78rem] laptop:text-xs tablet:text-xs text-gray-500">{post.user.bio}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.72rem] laptop:text-xs tablet:text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-base mobile:text-sm tablet:text-base laptop:text-base text-cyan-800">{post.content}</p>
              <p className="text-xs mobile:text-[0.75rem] tablet:text-xs laptop:text-xs text-cyan-600">#{post.tags.join(' #')}</p>
              <div className='mt-5 flex justify-between items-center'>
                <p className='text-sm mobile:text-xs tablet:text-sm laptop:text-sm text-gray-500'>0 Likes</p>
                <p className='text-sm mobile:text-xs tablet:text-sm laptop:text-sm text-gray-500'>0 Comments</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <FontAwesomeIcon icon={faHeart} className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer" />
              <FontAwesomeIcon icon={faComment} className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;