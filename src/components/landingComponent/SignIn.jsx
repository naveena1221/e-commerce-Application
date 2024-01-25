import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (!storedUserDetails) {
      setError('No user found. Please sign up.');
      return;
    }

    const { username: storedUsername, password: storedPassword, role } = storedUserDetails;

    if (storedUsername === username && storedPassword === password) {
      setAuthenticated(true);
      localStorage.setItem('authenticated', true); 
      console.log('Authentication successful');

      if (role === 'admin') {
        console.log('Navigating to /admin');
        navigate('/admin');
      } else {
        console.log('Navigating to /Home');
        navigate('/Home');
      }
    } else {
      setError('Invalid credentials');
      setUsername('');
      setPassword('');
    }
  };

  const signinStyles = {
    backgroundColor: '#d1d1f6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  };

  const inputStyle = {
    marginBottom: '10px',
    width: '400px',
    height: '30px',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px', 
    fontSize: '16px', 
    borderRadius: '10px',
    backgroundColor: '#734f96',
    color: 'white',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={signinStyles}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignIn} style={formStyle}>
        <div>
          <label>
            Username:
          </label><br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label>
            Password:
          </label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
        <p>New Customer Then <Link to="/SignUp">sign Up</Link></p>
      </form>
    </div>
  );
};

export default SignIn;