import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log(res);
      localStorage.setItem('token', res.data.token);
      console.log('Loggin Success', res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
     <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        // backgroundImage:
        //   "url('./images/loginBg.jpg')",
        backgroundColor: "#121212",
      }}
    >
      <div className="bg-[#1c1c1c] bg-opacity-90 px-10 py-12 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
          Welcome Back
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF385C] transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF385C] transition duration-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-[#FF385C] hover:bg-[#e62e50] cursor-pointer text-white font-semibold tracking-wide transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}