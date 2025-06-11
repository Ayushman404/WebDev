import { Link } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';



export default function PostCard({ post, onLike }) {


  

  const token = localStorage.getItem('token');

  const userId = jwtDecode(token).userId;


  const isLiked = userId && Array.isArray(post.likes) && post.likes.includes(userId);


  return (
    <div className="bg-[#1f1f1f] border border-[#2c2c2c] rounded-2xl shadow-md p-6 max-w-xl w-full text-white space-y-4">
  <Link to={`/post/${post._id}`} className="space-y-3 block">
    {/* Author Info */}
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/150?u=user"
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover border border-gray-600"
      />
      <h3 className="text-sm font-semibold text-white">{post.author.name}</h3>
    </div>

    {/* Post Content */}
    <p className="text-sm text-gray-200 leading-relaxed">
      {post.content}
    </p>

    {/* Post Metadata */}
    <div className="text-xs text-gray-400">
      
      <p>{String(post.createdAt)}</p>
    </div>
  </Link>

  {/* Action Buttons */}
  <div className="flex gap-6 border-t border-[#2c2c2c] pt-4">
    <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#FF385C] transition"
      onClick={()=>onLike(post._id)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
      <p>{isLiked ? "💔 Unlike" : "❤️ Like"} ({post.likes.length})</p>

    </button>
    <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#FF385C] transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 16.5A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5V6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v10z"
        />
      </svg>
      Comment
    </button>
  </div>
</div>
  );
}