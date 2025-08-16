import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/me`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        // navigate('/login');
        return;
        
      });

    axios
      .get(`http://localhost:8000/api/posts/user/${userId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f0f] text-white">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-[100px] px-4 relative">

      {/* 🔮 Background Light Accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF385C] opacity-[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-fuchsia-600 opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 👤 Profile Info Card */}
      <div className="max-w-2xl mx-auto bg-black/60 border border-[#2a2a2a] backdrop-blur-lg rounded-2xl p-6 mb-10 shadow-lg">
        <h2 className="text-3xl font-bold text-[#FF385C] mb-1">{user.name}</h2>
        {user.bio && <p className="text-gray-300 mb-1">{user.bio}</p>}
        <p className="text-sm text-gray-400">Posts: {posts.length}</p>
      </div>

      {/* 🧾 User Posts */}
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="text-center text-gray-500">No posts to show.</div>
        )}
      </div>
    </div>
  );
}
