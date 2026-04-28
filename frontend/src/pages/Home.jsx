import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User as UserIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/posts');
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading posts...</div>;

  return (
    <div>
      <section style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <h1>DevConnect: Where Developers <br/>Share Knowledge</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore insights, tutorials, and stories from the developer community. 
          Build your network and grow your skills together.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No posts found. Be the first to share something!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="card glass">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{post.title}</h3>
              <p style={{ marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.content}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <UserIcon size={14} color="var(--accent-primary)" />
                  <span>{post.author?.name || 'Anonymous'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <Calendar size={14} color="var(--accent-primary)" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Link to={`/posts/${post._id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
                Read Full Article <ArrowRight size={16} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
