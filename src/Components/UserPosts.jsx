import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPencil, faTrash, faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [device, setDevice] = useState(window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'laptop');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'laptop');
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncateBio = (bio) => {
    const charLimit = {
      mobile: 60,
      tablet: 60,
      laptop: 115
    };
    if (bio.length > charLimit[device]) {
      return `${bio.substring(0, charLimit[device])} ...`;
    }
    return bio;
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/userPosts', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch user posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setCurrentUserId(userData._id);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUserPosts();
    fetchCurrentUser();
  }, []);

  const toggleDropdown = (postId) => {
    setDropdownVisible(dropdownVisible === postId ? null : postId);
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const toggleLike = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      } else {
        console.error('Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}/bookmark`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      } else {
        console.error('Failed to bookmark post');
      }
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}min`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else if (diffInSeconds < 2419200) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}w`;
    } else {
      const months = Math.floor(diffInSeconds / 2419200);
      return `${months}m`;
    }
  };

  return (
    <div className="w-full mt-5 pb-10">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="shadow-md w-2/3 mx-auto mobile:w-[90vw] tablet:w-2/3 laptop:w-2/3 rounded-lg p-6 bg-cyan-50 mb-4 flex flex-col items-start justify-between relative"
          >
            <div className="w-full border-b border-cyan-600 mb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl mobile:text-xl tablet:text-2xl laptop:text-2xl dancingScript font-semibold text-cyan-900">
                  {post.title}
                </h2>
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer"
                  onClick={() => toggleDropdown(post._id)}
                />
                {dropdownVisible === post._id && (
                  <div className="absolute top-2 right-4 mt-10 bg-white shadow-lg rounded-md">
                    <p
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleEdit(post._id)}
                    >
                      <FontAwesomeIcon icon={faPencil} className="text-gray-700" />
                      &nbsp;&nbsp;Edit
                    </p>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => deletePost(post._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-gray-700" />
                      &nbsp;&nbsp;Delete
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-2 mb-6">
                <p className="text-sm mobile:text-[0.78rem] mobile:leading-[0.72rem] laptop:text-sm tablet:text-sm text-gray-500">
                  Posted by {post.user?.fullname || 'Unknown'}
                </p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.78rem] laptop:text-xs tablet:text-xs text-gray-500">
                  {truncateBio(post.user?.bio || 'No bio available')}
                </p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.72rem] laptop:text-xs tablet:text-xs text-gray-500">
                  {getTimeAgo(post.date)}
                </p>
              </div>
              <p className="text-base mobile:text-sm tablet:text-base laptop:text-base text-cyan-800">
                {post.content}
              </p>
              <p className="text-xs mobile:text-[0.75rem] tablet:text-xs laptop:text-xs text-cyan-600">
                #{post.tags.join(' #')}
              </p>
              <p className="text-sm mt-4 mb-1 mobile:text-xs tablet:text-sm laptop:text-sm text-gray-500">
                {(post.likes && Array.isArray(post.likes)) ? post.likes.length : 0} Likes
              </p>
            </div>
            <div className="flex items-center gap-5">
              <FontAwesomeIcon
                icon={post.likes && post.likes.includes(currentUserId) ? faHeartSolid : faHeartRegular}
                className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer"
                onClick={() => toggleLike(post._id)}
              />
              <FontAwesomeIcon
                icon={post.bookmarks && post.bookmarks.includes(currentUserId) ? faBookmarkSolid : faBookmarkRegular}
                className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer"
                onClick={() => toggleBookmark(post._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;