import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Save, ArrowLeft } from 'lucide-react';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        
        // Basic check if user is author (backend will also verify)
        if (!user || data.author?._id !== user._id) {
          setError('You are not authorized to edit this post');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error fetching post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content }, config);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating post');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading post details...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', padding: 0 }}>
        <ArrowLeft size={18} /> Cancel and Go Back
      </button>

      <h2 style={{ marginBottom: '2rem' }}>Edit Your Article</h2>
      
      {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '2.5rem' }}>
        <div className="input-group">
          <label>Article Title</label>
          <input 
            type="text" 
            className="input-control" 
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ fontSize: '1.2rem', fontWeight: '600' }}
          />
        </div>

        <div className="input-group">
          <label>Content</label>
          <textarea 
            className="input-control" 
            placeholder="Write your article here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="12"
            style={{ resize: 'vertical', lineHeight: '1.6' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={!!error}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
