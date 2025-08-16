import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/signup', { email, password, name, bio });
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] relative px-4">

      {/* 🌌 Background Blur Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF385C] opacity-[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-fuchsia-600 opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 🧾 Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md border border-[#2a2a2a] shadow-xl rounded-2xl p-8 text-white space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#FF385C]">Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#FF385C] placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#FF385C] placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#FF385C] placeholder-gray-400"
        />

        <textarea
          placeholder="Short bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#FF385C] placeholder-gray-400 resize-none"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-[#FF385C] hover:bg-[#e62e50] text-white font-semibold py-2 rounded-md transition-colors"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#FF385C] hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
