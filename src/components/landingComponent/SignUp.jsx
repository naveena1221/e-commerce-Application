import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters long');
    } else {
   
      setError('');
      setError('Registered Successfully. Redirecting to SignIn page, if not, please sign in below.');
      const userDetails = { username, password, role: isAdmin ? 'admin' : 'user' };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setUsername('');
      setPassword('');
      setTimeout(function () {
        navigate('/SignIn');
      }, 500);
    }
  };

  const styles = {
    backgroundColor: '#d1d1f6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  };
  const formStyle = {
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const inputStyle = {
    marginBottom: '10px',
    width: '400px',
    height: '30px',
  };

  const checkboxStyle = {
    marginTop: '10px',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px', 
    fontSize: '16px',
    borderRadius: '10px',
    backgroundColor: '#734f96',
    color: 'white',
  };

  return (
    <div style={styles}>
      <h2>Sign Up</h2>
      <p>Don't worry, your credentials are safe with us</p>
      <p>We won't sell your data</p>
      <form onSubmit={handleSignUp} style={formStyle}>
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
        <div style={checkboxStyle}>
          <label>
            <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
            Are you admin?
          </label>
        </div>
        {error && (error.includes('Successfully') ? <p style={{ color: 'green' }}>{error}</p> : <p style={{ color: 'red' }}>{error}</p>)}
        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
        <p>Already a user? Then <Link to="/SignIn">sign in</Link></p>
      </form>
    </div>
  );
}

export default SignUp;
