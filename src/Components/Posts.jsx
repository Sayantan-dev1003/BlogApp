import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [device, setDevice] = useState(window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'laptop');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'laptop');
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await fetch('/posts', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.reverse());
      } else {
        console.error("Failed to fetch posts");
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

    fetchAllPosts();
    fetchCurrentUser();
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

  return (
    <div className="w-full mt-5 pb-10">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="shadow-md w-2/3 mx-auto mobile:w-[90vw] tablet:w-2/3 laptop:w-2/3 rounded-lg p-6 bg-cyan-50 mb-4 flex flex-col items-start justify-between">
            <div className="w-full border-b border-cyan-600 mb-2">
              <h2 className="text-2xl mobile:text-xl tablet:text-2xl laptop:text-2xl dancingScript font-semibold text-cyan-900">{post.title}</h2>
              <div className="mt-2 mb-6">
                <p className="text-sm mobile:text-[0.78rem] mobile:leading-[0.72rem] laptop:text-sm tablet:text-sm text-gray-500">Posted by {post.user.fullname}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.78rem] laptop:text-xs tablet:text-xs text-gray-500">{truncateBio(post.user.bio)}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.72rem] laptop:text-xs tablet:text-xs text-gray-500">
                  {getTimeAgo(post.date)}
                </p>
              </div>
              <p className="text-base mobile:text-sm tablet:text-base laptop:text-base text-cyan-800">{post.content}</p>
              <p className="text-xs mobile:text-[0.75rem] tablet:text-xs laptop:text-xs text-cyan-600">#{post.tags.join(' #')}</p>
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

export default Posts;