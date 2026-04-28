import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User as UserIcon, ArrowLeft } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Post not found or server error');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading article...</div>;
  if (error) return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>{error}</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Back Home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to Feed
      </Link>

      <article className="glass" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h1>
        
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserIcon size={18} color="var(--accent-primary)" />
            <span>By <strong>{post.author?.name || 'Anonymous'}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--accent-primary)" />
            <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
