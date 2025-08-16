import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${postId}`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then((res) => setPost(res.data.post))
    .catch((err) => console.error(err));
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border shadow">
      <h2 className="text-xl font-bold mb-2">{post.author.username}</h2>
      <p>{post.content}</p>
    </div>
  );
}