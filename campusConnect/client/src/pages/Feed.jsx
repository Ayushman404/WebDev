import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsLoading(true);
    ;(
     async ()=>{
      const token = localStorage.getItem('token');
      if(!token){
        console.log("plz login");
        navigate('/login');
        return;
      }

      await axios.get('http://localhost:8000/api/posts', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then((res) => {
      console.log(res)
      setIsLoading(false);
      return setPosts(res.data)

    })
    .catch((err) => {
      setIsLoading(false);
      return console.error(err)
    });
     }
    )();
  }, []);


  const handleLikeToggle = async (postId) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/posts/${postId}/like`, null, {
      headers: { Authorization: localStorage.getItem('token') }
    });

    // Update just that one post's likes in state
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? { ...post, likes: res.data.likes } // `likes` should be sent in response
          : post
      )
    );
  } catch (err) {
    console.error("Like toggle failed:", err);
  }
};


  return (

    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0f0f0f] text-white pt-24">

      {/* 🌌 Parallax Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF385C] opacity-[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] left-[-150px] w-[500px] h-[500px] bg-fuchsia-600 opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-100px] w-[400px] h-[400px] bg-pink-700 opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 🧠 Feed Header */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white">CampusConnect Feed</h1>
        <p className="text-gray-400 text-sm mt-1">Stay updated with what's happening around you ✨</p>
        <div className="mt-3 w-16 h-1 mx-auto bg-[#FF385C] rounded-full" />
      </div>

      {/* 📝 Posts List */}
      {/* Loading State  */}
      {isLoading ? <h1 className='font-semibold text-white text-2xl'>Loading...</h1> :
        <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} onLike = {handleLikeToggle}/>)
        ) : (
          <div className="text-center py-20 text-gray-400 animate-pulse">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
            <p>No posts yet. Be the first to light up the feed!</p>
          </div>
        )}
      </div>}
    </div>
  );
}