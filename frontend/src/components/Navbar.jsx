import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, PlusSquare, User, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Link to="/" className="logo">
          Dev<span>Connect</span>
        </Link>

        <div className="nav-links">
          <Link to="/">
            <HomeIcon size={20} />
          </Link>
          
          {user ? (
            <>
              <Link to="/create" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                <PlusSquare size={18} /> New Post
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Hi, {user.name}
                </span>
                <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem' }}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
