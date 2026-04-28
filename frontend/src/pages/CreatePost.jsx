import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Send } from 'lucide-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/posts', { title, content }, config);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Share Your Thoughts</h2>
      
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
            placeholder="Write your article here... (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="12"
            style={{ resize: 'vertical', lineHeight: '1.6' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            <Send size={18} /> Publish Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
