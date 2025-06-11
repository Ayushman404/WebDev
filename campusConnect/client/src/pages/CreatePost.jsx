import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!content.trim()) return alert("Post content can't be empty.");
    setLoading(true);
    try {
      console.log("Creating Post");
      const res = await axios.post(
        '/api/posts/create',
        { content },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      if (res.data.success) {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.msg || 'Post creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f0f0f] px-4 relative">

      {/* 🎨 Background Accent Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF385C] opacity-[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-fuchsia-600 opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 📦 Post Box */}
      <div className="relative z-10 w-full max-w-xl bg-black/60 border border-[#2a2a2a] backdrop-blur-lg rounded-2xl p-8 shadow-xl space-y-6 text-white">
        <h2 className="text-2xl font-bold text-center text-[#FF385C]">Share a Thought</h2>

        <textarea
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 rounded-md bg-[#1c1c1c] text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#FF385C] placeholder-gray-400 resize-none"
        />

        <button
          onClick={handlePost}
          disabled={loading}
          className={`w-full py-2 font-semibold rounded-md transition-all ${
            loading
              ? 'bg-[#a12f46] cursor-not-allowed'
              : 'bg-[#FF385C] hover:bg-[#e62e50] cursor-pointer'
          } text-white`}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
