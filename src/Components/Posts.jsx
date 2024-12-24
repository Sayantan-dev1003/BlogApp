import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
    fetchAllPosts();
  }, []);

  return (
    <div className="w-full mt-5 pb-10">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="shadow-md w-2/3 mx-auto mobile:w-[90vw] tablet:w-2/3 laptop:w-2/3 rounded-lg p-6 bg-cyan-50 mb-4 flex flex-col items-start justify-between">
            <div className="w-full border-b border-cyan-700 pb-1 mb-4">
              <h2 className="text-2xl mobile:text-xl tablet:text-2xl laptop:text-2xl dancingScript font-semibold text-cyan-900">{post.title}</h2>
              <div className="mt-2 mb-6">
                <p className="text-sm mobile:text-[0.78rem] mobile:leading-[0.72rem] laptop:text-sm tablet:text-sm text-gray-500">Posted by {post.user.fullname}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.78rem] laptop:text-xs tablet:text-xs text-gray-500">{post.user.bio}</p>
                <p className="text-xs mobile:text-[0.6rem] mobile:leading-[0.72rem] laptop:text-xs tablet:text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-base mobile:text-sm tablet:text-base laptop:text-base text-cyan-800">{post.content}</p>
              <p className="text-xs mobile:text-[0.75rem] tablet:text-xs laptop:text-xs text-cyan-600">#{post.tags.join(' #')}</p>
              <p className='text-sm mobile:text-xs tablet:text-sm laptop:text-sm text-gray-500 mt-5'>0 Likes</p>
            </div>
            <div className="flex items-center gap-5">
              <FontAwesomeIcon icon={faHeartRegular} className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer" />
              <FontAwesomeIcon icon={faBookmarkRegular} className="text-lg text-cyan-500 hover:text-cyan-700 cursor-pointer" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;